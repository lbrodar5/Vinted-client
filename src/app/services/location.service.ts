import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  lat = 0;
  long = 0;
  city : BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private http : HttpClient) { }

  getCity(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
      console.log(this.lat,this.long)
      this.http.get<any>(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${this.lat}&lon=${this.long}`)
        .subscribe(data => {
          if(data.address.city){
            this.city.next(data.address.city);
          } else {
            this.city.next(data.address.county);
          }
        });
      });
  }
}
