import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { LocalStoreService } from "./local-store.service";

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  url = environment.ulrBackend+"empresa";
  header = new HttpHeaders();

	constructor(private http: HttpClient,private store: LocalStoreService,){
 
    this.header.append('Content-Type','application/json');
    this.header = this.header.append('Authorization','Bearer ' + this.store.getItem("token"));
  }
  
  index(idUsuario){
    return this.http.get(this.url+'/'+idUsuario+'/',{headers:this.header})
    .pipe(map(data => data));
  }

  edit(formData, json){
    let data = JSON.stringify(json);
    formData.append('data', data);
    return this.http.post(this.url+'/'+json.empresa.id+'/edit',formData)
    .pipe(map(data => data));
  }


  delete(json){
    return this.http.post(this.url+'/'+json.id+'/delete',json,{headers:this.header})
    .pipe(map(data => data));
  }

  new(formData, json){
    let data = JSON.stringify(json);
    formData.append('data', data);
    return this.http.post(this.url+'/new',formData,{headers:this.header})
    .pipe(map(data => data));
  }

  show(id){
    return this.http.get(this.url+'/'+id+'/show',{headers:this.header})
    .pipe(map(data => data));
  }

  select(){
    return this.http.get(this.url+'/empresa/select',{headers:this.header})
    .pipe(map(data => data));
  }
 }
