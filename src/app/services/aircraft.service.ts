import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aircraft } from '../model/Aircraft';

@Injectable({
  providedIn: 'root',
})
export class AircraftService {
  constructor() {}

  urlAircrafts = environment.urlAircrafts;
  instructor: any;

  http = inject(HttpClient);


    listAircraft(): Observable<Aircraft[]> {
      return this.http.get<Aircraft[]>(this.urlAircrafts + '/list');
    }




  GetAircraft(id: number) {
    return this.http.get(`${this.urlAircrafts}/${id}`);
  }

  createAircraft(myform: Aircraft): Observable<any> {
    return this.http.post(`${this.urlAircrafts}/add`, myform);
  }
}
