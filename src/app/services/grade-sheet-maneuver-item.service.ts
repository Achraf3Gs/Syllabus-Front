import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradeSheetManeuverItemService {

urlgradeSheetManeuverItem = environment.urlgradeSheetManeuverItem;
  studentPilot: any;

  http = inject(HttpClient);

  listGradeSheetManeuverItem(id: number): Observable<any[]> {
     return this.http.get<any[]>(
       `${this.urlgradeSheetManeuverItem}/${id}`
     );
   }
}
