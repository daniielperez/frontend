import { Injectable, NgZone } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { LocalStoreService } from "./local-store.service";
import { Observable } from 'rxjs';
import { google } from "google-maps";
//import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';


declare var google : google;

@Injectable({
  providedIn: 'root',
})


//export class LugarService extends GoogleMapsAPIWrapper{
export class LugarService {

  url = environment.ulrBackend+"lugar";
  header = new HttpHeaders();

	constructor(
    private http: HttpClient,
    private store: LocalStoreService,
    /* private __loader: MapsAPILoader, private __zone: NgZone */
    ){
    /* super(__loader, __zone); */
    this.header.append('Content-Type','application/json');
    this.header = this.header.append('Authorization','Bearer ' + this.store.getItem("token"));
  }
  
  index(){
    return this.http.get(this.url+'/',{headers:this.header}).pipe(map(data => data));
  }

  edit(json){
    return this.http.post(this.url+'/'+json.id+'/edit',json,{headers:this.header})
    .pipe(map(data => data));
  }

  delete(json){
    return this.http.post(this.url+'/'+json.id+'/delete',json,{headers:this.header})
    .pipe(map(data => data));
  }

  new(json){
    return this.http.post(this.url+'/new',json,{headers:this.header})
    .pipe(map(data => data));
  }

  select(){
    return this.http.get(this.url+'/select',{headers:this.header})
    .pipe(map(data => data));
  }

  getLatLng(address: string) {
    let geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                observer.next(results[0].geometry.location);
                observer.complete();                    
            } else {
                console.log('Error - ', results, ' & Status - ', status);
                observer.next({});
                observer.complete();
            }
        });
    }) 
  }

  getAddress(coords: any) {
      console.log('Getting Address - ', coords);
      let geocoder = new google.maps.Geocoder();
      return Observable.create(observer => {
          geocoder.geocode( { 'location': coords }, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                  observer.next(results[0].formatted_address);
                  observer.complete();                    
              } else {
                  console.log('Error - ', results, ' & Status - ', status);
                  observer.next({});
                  observer.complete();
              }
          });
      })
  }
 }
