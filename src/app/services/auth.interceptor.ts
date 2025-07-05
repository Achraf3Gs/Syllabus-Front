import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { catchError, throwError, finalize, tap } from 'rxjs';
import { Router } from '@angular/router';
import { BusyService } from './busy.service';
import { AuthUserService } from './authuser.service';
import { environment } from '../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);
  const authUserService = inject(AuthUserService);
  const router = inject(Router);

  // Skip auth for auth endpoints
  if (
    req.url.includes('/api/v1/auth/authenticate') ||
    req.url.includes('/api/v1/auth/register') ||
    req.url.includes('/api/v1/auth/logout')
  ) {
    return next(req);
  }

  busyService.busy();

  const token = authUserService.getAccess_TokenFromLocalStorage();
  console.log('Auth Interceptor - Token:', token ? 'Present' : 'Missing');

  // Log the original request
  console.log('Original Request:', {
    url: req.url,
    method: req.method,
    headers: req.headers.keys().reduce((acc, key) => ({
      ...acc,
      [key]: req.headers.get(key)
    }), {})
  });

  let authReq = req;

  // Clone the request and add auth headers
  if (token) {
    authReq = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      params: req.params
        .set('secret', environment.secret)
        .set('client', environment.client),
    });
  }

  // Log the modified request
  console.log('Modified Request:', {
    url: authReq.url,
    method: authReq.method,
    headers: authReq.headers.keys().reduce((acc, key) => ({
      ...acc,
      [key]: authReq.headers.get(key)
    }), {}),
    params: Array.from(authReq.params.keys()).reduce((acc, key) => ({
      ...acc,
      [key]: authReq.params.get(key)
    }), {})
  });

  return next(authReq).pipe(
    tap({
      next: (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          console.log('Response:', {
            status: event.status,
            statusText: event.statusText,
            url: event.url || '',
            headers: event.headers.keys().reduce((acc: any, key) => ({
              ...acc,
              [key]: event.headers.getAll(key)
            }), {})
          });
        }
      },
      error: (error: any) => {
        console.error('Error in response:', error);
      }
    }),
    finalize(() => {
      console.log('Request completed');
      busyService.idle();
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('Interceptor - Error Details:', {
        status: error.status,
        statusText: error.statusText,
        url: error.url,
        headers: error.headers,
        error: error.error,
        message: error.message,
        name: error.name
      });

      if (error.status === 401) {
        console.warn('Authentication required - redirecting to login');
        localStorage.removeItem('access_Token');
        router.navigate(['/login']);
      } else if (error.status === 403) {
        console.error('Access Forbidden - Insufficient permissions');
        // You could add a notification service call here to show an error to the user
      }
      
      return throwError(() => error);
    })
  );
};
