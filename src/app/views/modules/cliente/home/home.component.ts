import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from '../../../../services/evento.service';
import { environment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { LocalStoreService } from "../../../../services/local-store.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading: boolean;
  eventosProximos= [];
  eventosTop= [];
  todos= [];
  publicidades;
  imagen;
  ulr = environment.ulrImage+"publicidad/";

  constructor(
    private _EventoService: EventoService,
    private _Router: Router,
  ) { }

  ngOnInit() {
    this._EventoService.indexCliente().subscribe(
      response => { 
        if(response['code'] == 200){

          response['data']['eventosTop'].forEach(element => {
            if(element['publicidades'][0]){
              this.imagen = element['publicidades'][0].url_imagen;
            }else{
              this.imagen = null
            }
            if(response['data']['eventosTop'].length > 0){
             let array = {
               id: element.id,
               idEmpresa: element.empresa.id,
               nombre: element.nombre,
               nombreEmpresa: element.empresa.nombre,
               lugar: element.lugar.nombre, 
               direccion: element.lugar.direccion,
               empresa_reds: element.empresa.empresa_reds,
               imagen: this.imagen,
            }
            this.eventosTop.push(array); 
            }
          }); 

          response['data']['todos'].forEach(element => {
            if(element['publicidades'][0]){
              this.imagen = element['publicidades'][0].url_imagen;
            }else{
              this.imagen = null
            }
            if(response['data']['todos'].length > 0){
             let array = {
               id: element.id,
               nombre: element.nombre,
               nombreEmpresa: element.empresa.nombre,
               lugar: element.lugar.nombre, 
               direccion: element.lugar.direccion,
               empresa_reds: element.empresa.empresa_reds,
               imagen: this.imagen,
            }
            this.todos.push(array);
            }
          });

          response['data']['eventosProximos'].forEach(element => {
            if(element['publicidades'][0]){
              this.imagen = element['publicidades'][0].url_imagen;
            }else{
              this.imagen = null
            }
            if(response['data']['eventosProximos'].length > 0){
             let array = {
               nombre: element.nombre,
               id: element.id,
               nombreEmpresa: element.empresa.nombre,
               lugar: element.lugar.nombre, 
               direccion: element.lugar.direccion,
               empresa_reds: element.empresa.empresa_reds,
               imagen: this.imagen,
            }
            this.eventosProximos.push(array);
            }
          });
        }
    }, error => {
      alert(error.error.error_description);
    })
  }

  onShowEvento(idEvento){
    this._Router.navigate(['modules/cliente/evento/',idEvento]);
  } 
}
