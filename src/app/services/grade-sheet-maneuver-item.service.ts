import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GradeSheetManeuver } from '../model/GradeSheetManeuver';

@Injectable({
  providedIn: 'root'
})
export class GradeSheetManeuverItemService {

urlgradeSheetManeuverItem = environment.urlgradeSheetManeuverItem;
  studentPilot: any;

  http = inject(HttpClient);

  listGradeSheetManeuverItem(id: number): Observable<GradeSheetManeuver[]> {
     return this.http.get<GradeSheetManeuver[]>(
       `${this.urlgradeSheetManeuverItem}/${id}`
     );
   }
}
