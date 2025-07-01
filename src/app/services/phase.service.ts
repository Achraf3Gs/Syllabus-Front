import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Phase } from '../model/Phase';

@Injectable({
  providedIn: 'root',
})
export class PhaseService {
  constructor() {}
  urlPhase = environment.urlPhase;
  instructor: any;

  http = inject(HttpClient);

  listPhase(): Observable<Phase[]> {
    return this.http.get<Phase[]>(this.urlPhase + '/list');
  }

  GetPhase(id: number) {
    return this.http.get(`${this.urlPhase}/${id}`);
  }

  createPhase(myform: Phase): Observable<any> {
    return this.http.post(`${this.urlPhase}/add`, myform);
  }

  deletePhase(PhaseId: number): Observable<any> {
    return this.http.delete(`${this.urlPhase}/delete/${PhaseId}`);
  }
 updatePhase(
        phaseId: number,
        myform: Phase   
      ): Observable<any> {
        return this.http.put(
          `${this.urlPhase}/update/${phaseId}`,
          myform
        );
      }

}
