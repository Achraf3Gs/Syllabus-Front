import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { GradeSheet } from '../model/GradeSheet';

@Injectable({
  providedIn: 'root',
})
export class GardeSheetService {
  urlGradeSheet = environment.urlGradeSheet;
  gradeSgeet: any;

  http = inject(HttpClient);

  listGradeSheet(): Observable<any[]> {
    return this.http.get<any[]>(this.urlGradeSheet + '/list');
  }

  GetGradeSheet(id: number) {
    return this.http.get(`${this.urlGradeSheet}/${id}`);
  }

  createGradeSheet(myform: any): Observable<any> {
    return this.http.post(`${this.urlGradeSheet}/add`, myform);
  }

  createRowGradeSheet(
    myform: GradeSheet,
    flightDomainSyllabusId: number
  ): Observable<any> {
    return this.http.post(
      `${this.urlGradeSheet}/addTemplateWithManeuvers/${flightDomainSyllabusId}`,
      myform
    );
  }
  updateRowGradeSheet(
    myform: GradeSheet,
    flightDomainSyllabusId: number,
    gradeSheetId: number
  ): Observable<any> {
    return this.http.put(
      `${this.urlGradeSheet}/update/${flightDomainSyllabusId}/${gradeSheetId}`,
      myform
    );
  }
  listflightDomainGradeSheets(id: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.urlGradeSheet}/${id}/flightDomainGradeSheets`
    );
  }

  listFlightDoaminSyllabusGradeSheet(id: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.urlGradeSheet}/${id}/flightDomainGradeSheets`
    );
  }

  deleteGradeSheet(GradeSheetId: number): Observable<any> {
    return this.http.delete(`${this.urlGradeSheet}/delete/${GradeSheetId}`);
  }
}
