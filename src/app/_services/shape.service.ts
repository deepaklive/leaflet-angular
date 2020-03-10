import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor(private http: HttpClient) { }

  getStateShapes(): Observable<any> {
    return this.http.get('/assets/us_states_5m.json');
    // return this.http.get('/assets/fir_regions.json');
  }
}
