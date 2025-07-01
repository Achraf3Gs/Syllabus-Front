import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Instructor } from '../model/Instructor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsructorService {
  getInstructorByCallSign(callSign: number) {
    return this.http.get(`${this.urlInstructors}/callSign/${callSign}`);
  }
  urlInstructors = environment.urlInstructors;
  urlStudentPilots = environment.urlStudentPilots;
  instructor: any;

  http = inject(HttpClient);

  listInstructor() {
    return this.http.get(this.urlInstructors + '/list');
  }

  GetInstructor(id: number) {
    return this.http.get(`${this.urlInstructors}/${id}`);
  }

  createInstructor(myform: Instructor): Observable<any> {
    return this.http.post(`${this.urlInstructors}/add`, myform);
  }
   updateInstructor(
            instructorId: number,
            myform: Instructor   
          ): Observable<any> {
            return this.http.put(
              `${this.urlInstructors}/update/${instructorId}`,
              myform
            );
          }
}
