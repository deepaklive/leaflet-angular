import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as L from 'leaflet';
import { PopUpService } from './pop-up.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  airports = '/assets/airports.geojson';

  static ScaledRadius(val: number, maxVal: number): number {
    return 20 * (val / maxVal);
  }

  constructor(private http: HttpClient,
              private popupService: PopUpService) {}

  makeCapitalMarkers(map: L.map): void {
    this.http.get(this.airports).subscribe((res: any) => {
      for (const c of res) {
        const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];
        const marker = L.marker([lon, lat]).addTo(map);
      }
    });
  }

  randomNumber(): number{
    const min = 1;
    const max = 20;
    const random = Math.floor(Math.random() * (+max - +min)) + +min;
    return random;
  }
  makeCapitalCircleMarkers(map: L.map): void {
    this.http.get(this.airports).subscribe((res: any) => {

      // Find the maximum population to scale the radii by.
      // const maxVal = Math.max(...res.features.map(x => x.properties.airportName), 0);
      const maxVal = this.randomNumber();

      for (const c of res) {
        const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];
      //   const circle = L.circleMarker([lon, lat]).addTo(map);
      //   const circle = L.circleMarker([lon, lat], 
      //     {
      //       radius: 20
      //     }
      // ).addTo(map);
        const circle = L.circleMarker([lon, lat], {
          radius: MarkerService.ScaledRadius(2, 20)
        }).addTo(map);
        //console.log(c);
        circle.bindPopup(this.popupService.makeAirportPopup(c));
      }
    });
  }

  
}
