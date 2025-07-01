import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Student } from '../model/Student';
import { Observable } from 'rxjs';
import { InsructorService } from './insructor.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  urlStudentPilots = environment.urlStudentPilots;
  studentPilot: any;

  http = inject(HttpClient);
  instructorService = inject(InsructorService);
  listStudents() {
    return this.http.get(this.urlStudentPilots + '/list');
  }

  createStudentPilot(myform: any) {
    this.studentPilot = {
      firstName: myform.value.StudentPilotFirstName,
      lastName: myform.value.StudentPilotLastName,
      callSign: myform.value.StudentPilotCallSign,
      mobile: myform.value.StudentPilotMobile,
      email: myform.value.StudentPilotEmail,
    };
    console.log(this.studentPilot);
    return this.http.post(
      `${this.urlStudentPilots}/add/${myform.value.StudentPilotInstructorId}`,
      this.studentPilot
    );
  }
  createStudent(myform: Student, StudentPilotInstructorId:number): Observable<any> {
    return this.http.post(
      `${this.urlStudentPilots}/add/${StudentPilotInstructorId}`,
      myform
    );
  }

 updateStudent(
      myform: Student,
      instructorId: number,
      studentId: number
    ): Observable<any> {
      return this.http.put(
        `${this.urlStudentPilots}/update/${instructorId}/${studentId}`,
        myform
      );
    }

  deleteStudentPilot(id: any) {
    console.log(this.urlStudentPilots + '/' + id);
    return this.http.delete(this.urlStudentPilots + '/delete/' + id);
  }
  getStudentPilot(id: number): Observable<Student> {
    return this.http.get<Student>(this.urlStudentPilots + '/' + id);
  }
  listInstructorStudents(id: number) {
    return this.http.get(`${this.urlStudentPilots}/${id}/students`);
  }
}
