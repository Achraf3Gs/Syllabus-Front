import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SortiesType } from '../model/SortiesType';

@Injectable({
  providedIn: 'root',
})
export class SortiesTypesService {
 
  constructor() {}
  urlSortiesTypes = environment.urlSortiesTypes;
  instructor: any;

  http = inject(HttpClient);

  listSortiesType(): Observable<SortiesType[]> {
    return this.http.get<SortiesType[]>(this.urlSortiesTypes + '/list');
  }

  GetSortiesType(id: number) {
    return this.http.get(`${this.urlSortiesTypes}/${id}`);
  }

  createSortiesType(myform: SortiesType): Observable<any> {
    return this.http.post(`${this.urlSortiesTypes}/add`, myform);
  }

  deleteSortiesType(SortiesTypeId: number): Observable<any> {
    return this.http.delete(`${this.urlSortiesTypes}/delete/${SortiesTypeId}`);
  }
}
