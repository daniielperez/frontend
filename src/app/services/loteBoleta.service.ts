import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { LocalStoreService } from "./local-store.service";

@Injectable({
  providedIn: 'root'
})
export class LoteBoletaService {

  url = environment.ulrBackend+"loteboleta";
  header = new HttpHeaders();

	constructor(private http: HttpClient,private store: LocalStoreService,){
 
    this.header.append('Content-Type','application/json');
    this.header = this.header.append('Authorization','Bearer ' + this.store.getItem("token"));
  }
  
  index(json){
    return this.http.post(this.url+'/',json,{headers:this.header})
    .pipe(map(data => data));
  }

  edit(json){
    return this.http.post(this.url+'/'+json.id+'/edit',json,{headers:this.header})
    .pipe(map(data => data));
  }

  delete(json){ 
    return this.http.get(this.url+'/'+json.id+'/delete',{headers:this.header})
    .pipe(map(data => data));
  }

  new(json){
    return this.http.post(this.url+'/new',json,{headers:this.header})
    .pipe(map(data => data));
  }
 }
