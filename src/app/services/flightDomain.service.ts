import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlightDomain } from '../model/FlightDomain';

@Injectable({
  providedIn: 'root',
})
export class FlightDomainService {
  urlflightDomain = environment.urlflightDomain;
  urlmaneuverItem = environment.urlmaneuverItem;
  urlcts = environment.urlcts;

  maneuvers: any;

  http = inject(HttpClient);

  listFlightDomain(): Observable<any[]> {
    return this.http.get<any[]>(this.urlflightDomain + '/list');
  }
  getFlightDomainByName(name: string) {
    return this.http.get(`${this.urlflightDomain}/name/${name}`);
  }

  createFlightDomain(myform: FlightDomain): Observable<any> {
    return this.http.post(`${this.urlflightDomain}/add`, myform);
  }

  deleteFlightDomain(flightDomainId: number): Observable<any> {
    return this.http.delete(`${this.urlflightDomain}/delete/${flightDomainId}`);
  }
}
