import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../../services/empresa.service';
import { environment } from '../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStoreService } from "../../../services/local-store.service";

@Component({
  selector: 'app-empresaPerfil',
  templateUrl: './empresaPerfil.component.html',
  styleUrls: ['./empresaPerfil.component.scss']
})
export class EmpresaPerfilComponent implements OnInit {
  loading: boolean;
  eventos=[];
  imagen;
  publicidades;
  empresa;
  usernameEmpresa;
  styleBackground;
  ulr = environment.ulrImage+"empresa/";
  ulrEvento = environment.ulrImage+"publicidad/";
  zoom: number;

  constructor(
    private rutaActiva: ActivatedRoute,
    private _EmpresaService: EmpresaService,
    private _Router: Router,
    private sanitizer: DomSanitizer,
    private store: LocalStoreService,
  ) { }

  ngOnInit() { 
    this.zoom = 15;
    let idEmpresa = this.rutaActiva.snapshot.params.idEmpresa;
    this._EmpresaService.show(idEmpresa).subscribe(
      response => { 
        if(response['status'] == 200){
          response['data']['eventos'].forEach(element => {
            if(element['publicidades'][0]){
              this.imagen = element['publicidades'][0].url_imagen;
            }else{
              this.imagen = null
            }
            if(response['data']['eventos'].length > 0){
              let array = {
                id: element.id,
                nombre: element.nombre,
                nombreEmpresa: element.empresa.nombre,
                lugar: element.lugar.nombre, 
                direccion: element.lugar.direccion,
                empresa_reds: element.empresa.empresa_reds,
                imagen: this.imagen,
              }
              this.eventos.push(array); 
            }
          });
          this.empresa = response['data']['empresa'];
          this.usernameEmpresa = this.store.getItem("username");
          this.empresa.lng = parseFloat(this.empresa.lng);
          this.empresa.lat = parseFloat(this.empresa.lat);
          let style = 'background-image: url('+this.ulr+'portada/'+this.empresa.portada+')'
          this.styleBackground = this.sanitizer.bypassSecurityTrustStyle(style);

        }
    }, error => {
      alert(error.error.error_description);
    })
  }

  onShowEvento(idEvento){
    this._Router.navigate(['modules/cliente/evento/',idEvento]);
  } 
}
