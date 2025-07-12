import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Student } from '../model/Student';
import { StudentSyllabus } from '../model/StudentSyllabus';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { InsructorService } from './insructor.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  urlStudentPilots = environment.urlStudentPilots;
  studentPilot: any;

  http = inject(HttpClient);
  instructorService = inject(InsructorService);
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.urlStudentPilots}/list`).pipe(
      tap(students => console.log('Fetched students:', students)),
      catchError(error => {
        console.error('Error fetching students:', error);
        return throwError(() => new Error('Failed to fetch students'));
      })
    );
  }

  // Keeping the existing method for backward compatibility
  listStudents() {
    return this.getStudents();
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

  // Student Syllabus Assignment Methods
  
  /**
   * Assign a syllabus to a student
   * @param studentId ID of the student
   * @param syllabusId ID of the syllabus to assign
   * @returns Observable with the created StudentSyllabus
   */
  assignSyllabus(studentId: number, syllabusId: number): Observable<StudentSyllabus> {
    console.log('Sending request to assign syllabus', { studentId, syllabusId });
    const url = `${this.urlStudentPilots}/${studentId}/syllabi`;
    
    // The backend expects a simple object with just the syllabusId
    const body = { syllabusId };
    
    // Log the full request details
    console.group('Request Details');
    console.log('Method: POST');
    console.log('URL:', url);
    console.log('Body:', body);
    console.log('Headers:', {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    console.groupEnd();
    
    return this.http.post<StudentSyllabus>(url, body, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      params: {
        secret: environment.secret,
        client: environment.client
      }
    }).pipe(
      tap(response => {
        console.log('Assignment successful:', response);
      }),
      catchError(error => {
        console.error('Error in assignSyllabus:', {
          error: error,
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          errorDetails: error.error,
          headers: error.headers
        });
        return throwError(() => error);
      })
    );
  }

  /**
   * Get all syllabi assigned to a student
   * @param studentId ID of the student
   * @returns Observable with array of StudentSyllabus
   */
  getStudentSyllabi(studentId: number): Observable<StudentSyllabus[]> {
    return this.http.get<StudentSyllabus[]>(`${this.urlStudentPilots}/${studentId}/syllabi`).pipe(
      tap(response => console.log('Fetched student syllabi:', response)),
      map(response => {
        // Ensure we have a valid array
        if (!Array.isArray(response)) {
          console.warn('Expected an array of syllabi but got:', response);
          return [];
        }
        
        // Map the response to ensure it matches our StudentSyllabus interface
        return response.map(item => ({
          id: item.id,
          syllabusId: item.syllabusId,
          syllabusName: item.syllabusName || 'Unnamed Syllabus',
          assignedDate: item.assignedDate || new Date().toISOString(),
          status: item.status || 'NOT_STARTED',
          completionDate: item.completionDate || null,
          progress: item.progress || 0,
          notes: item.notes || ''
        }));
      }),
      catchError(error => {
        console.error('Error fetching student syllabi:', error);
        // Return an empty array on error
        return of([]);
      })
    );
  }

  /**
   * Update the status of a student's syllabus assignment
   * @param assignmentId ID of the assignment
   * @param status New status
   * @returns Observable with the updated StudentSyllabus
   */
  updateSyllabusStatus(assignmentId: number, status: 'Active' | 'Completed' | 'Dropped'): Observable<StudentSyllabus> {
    return this.http.patch<StudentSyllabus>(
      `${this.urlStudentPilots}/syllabi/${assignmentId}`,
      { status }
    );
  }
}
