import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Phase } from '../model/Phase';
import { FlightDoaminSyllabus } from '../model/FlightDoaminSyllabus';
@Injectable({
  providedIn: 'root',
})
export class FlightDomainSyllabusService {
  urlflightDomainSyllabus = environment.urlflightDomainSyllabus;
  instructor: any;

  http = inject(HttpClient);

  listFlightDoaminSyllabus(): Observable<FlightDoaminSyllabus[]> {
    return this.http.get<FlightDoaminSyllabus[]>(
      this.urlflightDomainSyllabus + '/list'
    );
  }

  GetFlightDoaminSyllabus(id: number) {
    return this.http.get(`${this.urlflightDomainSyllabus}/${id}`);
  }

  createFlightDoaminSyllabus(
    myform: FlightDoaminSyllabus,
    SyllabusId: number
  ): Observable<any> {
    return this.http.post(
      `${this.urlflightDomainSyllabus}/add/${SyllabusId}`,
      myform
    );
  }

  deleteFlightDoaminSyllabus(FlightDoaminSyllabusId: number): Observable<any> {
    return this.http.delete(
      `${this.urlflightDomainSyllabus}/delete/${FlightDoaminSyllabusId}`
    );
  }

  listSyllabusFlightDoaminSyllabus(id: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.urlflightDomainSyllabus}/${id}/flightDomainSyllabuss`
    );
  }

  getFlightDomainSyllabusName(name: string) {
    return this.http.get(`${this.urlflightDomainSyllabus}/name/${name}`);
  }
}
