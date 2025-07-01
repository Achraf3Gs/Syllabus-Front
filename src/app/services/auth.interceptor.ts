import { BusyService } from './busy.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, throwError, Observable, finalize } from 'rxjs';

import { Router } from '@angular/router';
import { AuthUserService } from './authuser.service';
import { environment } from '../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private secret = environment.secret;
  private client = environment.client;

  constructor(
    private busyService: BusyService,
    private authUserService: AuthUserService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      request.url.includes('/api/v1/auth/authenticate') ||
      request.url.includes('/api/v1/auth/register') ||
      request.url.includes('/api/v1/auth/logout')
    ) {
      return next.handle(request);
    }

    this.busyService.busy();

    if (this.authUserService.UserLoggedIn()) {
      request = this.addAuthHeaders(request);
    }

    return next.handle(request).pipe(
      finalize(() => this.busyService.idle()),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          // Save the URL the user was trying to access.
          localStorage.setItem('attemptedURL', this.router.url);

          // Perform a client-side-only logout to avoid an infinite loop.
          // The regular logout() method makes an HTTP call which would also fail.
          localStorage.removeItem('access_Token');
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }

  private addAuthHeaders(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.authUserService.getAccess_TokenFromLocalStorage();
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
        params: request.params
          .set('secret', this.secret)
          .set('client', this.client),
      });
    }
    return request;
  }
}
