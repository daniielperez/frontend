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


//export class VentaService extends GoogleMapsAPIWrapper{
export class VentaService {

  url = environment.ulrBackend+"venta";
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

  ultimoCodigo(username){
    return this.http.get(this.url+'/ultimo/codigo/'+username,{headers:this.header}).pipe(map(data => data));
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
 }
