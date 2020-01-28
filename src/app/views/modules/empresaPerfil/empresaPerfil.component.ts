import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from '../../../services/evento.service';
import { BoletaService } from '../../../services/boleta.service';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { LocalStoreService } from "../../../services/local-store.service";

@Component({
  selector: 'app-empresaPerfil',
  templateUrl: './empresaPerfil.component.html',
  styleUrls: ['./empresaPerfil.component.scss']
})
export class EmpresaPerfilComponent implements OnInit {
  loading: boolean;
  eventos:any;
  publicidades;
  imagen;
  ulr = environment.ulrImage+"publicidad/";

  constructor(
    private _EventoService: EventoService,
    private _Router: Router,
    private toastr: ToastrService,
    private store: LocalStoreService,
  ) { }

  ngOnInit() {
    this._EventoService.indexCliente().subscribe(
      response => { 
        if(response['code'] == 200){
          this.eventos = response['eventos'];
        }
    }, error => {
      alert(error.error.error_description);
    })
  }

  onShowEvento(idEvento){
    this._Router.navigate(['modules/cliente/evento/',idEvento]);
    console.log(idEvento);
  } 
}
