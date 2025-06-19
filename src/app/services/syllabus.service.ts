import { Student } from './../model/Student';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Syllabus } from '../model/Syllabus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SyllabusService {
  urlsyllabus = environment.urlsyllabus;

  http = inject(HttpClient);

  createSyllabus(myform: Syllabus): Observable<any> {
    return this.http.post(`${this.urlsyllabus}/add`, myform);
  }

  listSyllabus(): Observable<Syllabus[]> {
    return this.http.get<Syllabus[]>(this.urlsyllabus + '/list');
  }
  getSyllabusByTitle(title: string) {
    return this.http.get(`${this.urlsyllabus}/title/${title}`);
  }
  updateSyllabus(
    myform: Syllabus,
    StudentId: number,
    SyllabusId: number
  ): Observable<any> {
    return this.http.put(
      `${this.urlsyllabus}/update/${StudentId}/${SyllabusId}`,
      myform
    );
  }

  deleteManeuverItem(SyllabusId: number): Observable<any> {
    return this.http.delete(`${this.urlsyllabus}/delete/${SyllabusId}`);
  }
}

