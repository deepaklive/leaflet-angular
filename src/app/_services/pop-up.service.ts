import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }

  makeAirportPopup(data: any): string {
    return  '<div>' + `${ data.airportName} ` + '(' + `${data.airportCode}` + ')</div>';
  }
}
