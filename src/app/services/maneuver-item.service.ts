import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ManeuverItem } from '../model/maneuverItem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManeuverItemService {
  urlmaneuverItem = environment.urlmaneuverItem;

  http = inject(HttpClient);

  createManeuverItem(
    myform: ManeuverItem,
    FlightDoaminId: number
  ): Observable<any> {
    return this.http.post(
      `${this.urlmaneuverItem}/add/${FlightDoaminId}`,
      myform
    );
  }

  updateManeuverItem(
    myform: ManeuverItem,
    FlightDoaminId: number,
    ManeuverItemId: number
  ): Observable<any> {
    return this.http.put(
      `${this.urlmaneuverItem}/update/${FlightDoaminId}/${ManeuverItemId}`,
      myform
    );
  }

  deleteManeuverItem(ManeuverItemId: number): Observable<any> {
    return this.http.delete(`${this.urlmaneuverItem}/delete/${ManeuverItemId}`);
  }
}
