import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { LocalStoreService } from "./local-store.service";

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  url = environment.ulrBackend+"evento";
  header = new HttpHeaders();

	constructor(private http: HttpClient,private store: LocalStoreService,){
 
    this.header.append('Content-Type','application/json');
    this.header = this.header.append('Authorization','Bearer ' + this.store.getItem("token"));
  }
  
  index(idEmpresa){
    return this.http.get(this.url+'/index/list/registro/fronend/'+idEmpresa+'/',{headers:this.header})
    .pipe(map(data => data));
  }
  
  indexCliente(){
    return this.http.get(this.url+'/list/home/frontend',{headers:this.header})
    .pipe(map(data => data));
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

  show(idEvento){
    return this.http.get(this.url+'/'+idEvento+'/show',{headers:this.header})
    .pipe(map(data => data));
  }

  select(){
    return this.http.get(this.url+'/select/select',{headers:this.header})
    .pipe(map(data => data));
  }
 }
