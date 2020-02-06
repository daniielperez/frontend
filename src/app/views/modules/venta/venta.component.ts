import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { VentaService } from '../../../services/venta.service';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStoreService } from "../../../services/local-store.service";
import { UserService } from '../../../services/user.service';
import { PuntoEventoService } from '../../../services/puntoEvento.service';
import { EventoService } from '../../../services/evento.service';
import { BoletaService } from '../../../services/boleta.service';


@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit { 
  loading: boolean;
  loadingBuscar: boolean;
  @ViewChild('testForm', {static: false}) testFormElement; 
  formBasic: FormGroup;
  evento;
  publicidades;
  precios;
  codigoVenta;
  userComprador;
  eventoSelect;
  correoComprador;
  valorTotal = 0;
  categorias = [];
  categoriaDes = [];
  puntosVenta;
  eventos;
  puntosVentaSelect;
  formNew = false;
  state = false;
  ulrImage = environment.ulrImage+"publicidad";
  ulr = environment.ulrImage+"publicidad";

  constructor(
    private _VentaService: VentaService,
    private toastr: ToastrService,
    private store: LocalStoreService,
    private fb: FormBuilder,
    private _UserService: UserService,
    private _PuntoEventoService: PuntoEventoService,
    private _EventoService: EventoService,
    private _BoletaService: BoletaService,
    private cdref: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.buildFormBasic();
    this._VentaService.ultimoCodigo(this.store.getItem("username")).subscribe(
      response => { 
        this.state = true;
        if(response['code'] == 200){
          this.codigoVenta = response['codigo'];
          this.puntosVenta = response['puntosVenta'];
          if(!this.puntosVenta){
            this.toastr.error('Usuario no tiene un punto de venta asignado', 'Error!', {progressBar: true});
          }
        }
    }, error => {
      this.loading = false;
      alert(error.error.error_description);
    })
  }

  buildFormBasic() {
    this.formBasic = this.fb.group({
      correoComprador: ['', Validators.required]
    });
  }

  onAdd(categoria){
    if(categoria.disponibles > 0){
      categoria.boleta++;
      categoria.disponibles--;
      this.valorTotal = this.valorTotal + parseInt(categoria.valor);
    }
  }

  onRemove(categoria){
    if (categoria.boleta != 0) {
      categoria.boleta--;
      categoria.disponibles++;
      this.valorTotal = this.valorTotal - parseInt(categoria.valor);
    }
  }

  onSubmit() {
    this.loading = true;
    let valorTransaccion = this.valorTotal * (3.35/100) + 900;
    this.categorias.forEach(categoria => {
      if (categoria.boleta > 0) {
        this.categoriaDes.push(categoria);
      }
   });
    let datos = {
      'venta': {
        'codigo': this.codigoVenta,
        'valor_total': this.valorTotal,
        'valor_transaccion': valorTransaccion,
        'valor_venta': this.valorTotal - valorTransaccion,
        'estado': 'PAGADA',
        'tipo': 'PUNTOVENTA',
      },
      'idPuntoVenta': this.puntosVentaSelect,
      'detalle': this.categoriaDes,
      'user': this.userComprador.username
    }
    this._VentaService.new(datos).subscribe(
      response => { 
        if(response['code'] == 200){
          this.loading = false;
          let data ={
            categorias:this.categoriaDes,
            idVenta: response['data']['id']
          }
          this._BoletaService.new(data).subscribe(
            response => { 
              this.userComprador = null;
              this.evento = null;
              this.puntosVentaSelect = [this.puntosVentaSelect];
              this.eventoSelect = [];
              this.correoComprador = '';
              this.categorias = [];
              this.categoriaDes = [];
              this.valorTotal = 0;
              this.cdref.detectChanges();
              this.toastr.success('Datos guardados.', 'Perfecto!', {progressBar: true});
              // window.location.href = "/dashboard/v1";
          }, error => {
            this.loading = false;
            alert(error.error.error_description);
          });
        }
    }, error => {
      this.loading = false;
      alert(error.error.error_description);
    })
  }

  onSubmitBuscarUsuario() {
    this.loadingBuscar = true;
    this._UserService.showCorreo(this.correoComprador).subscribe(
      response => { 
        this.loadingBuscar = false;
        if(response['status'] == 200){
          this.userComprador = response['data'];
          this.formNew = false;
        }else{
          this.correoComprador = '';
          this.toastr.error('Usuario no encontrado', 'Error!', {progressBar: true});
          this.formNew = true;
          this.cdref.detectChanges(); 
          this.userComprador = false;
        }
    }, error => {
      this.loadingBuscar = false;
      alert(error.error.error_description);
    })
  }

  ready(isCreado:any){
    this.formNew = false;
    console.log(isCreado);
  }

  onChangedPunto(e){
    this._PuntoEventoService.select(e).subscribe(
      response => { 
        this.eventos = response;
    }, error => {
      this.loading = false;
      alert(error.error.error_description);
    });
  }

  onChangedevento(e){
    if (e) {
      this._EventoService.show(e).subscribe(
        response => { 
          if(response['status'] == 200){
            this.evento = response['data']['evento'];
            this.publicidades = response['data']['evento']['publicidades'];
            this.precios = response['data']['precios'];
            if (response['data']['categorias']) {
              response['data']['categorias'].forEach(element => {
                if(element.disponibles > 0){
                 let array = {
                   username: this.userComprador.username,
                   idVendedor: this.store.getItem("username"),
                   idCategoria: element.id, 
                   nombre: element.nombre,
                   valor: element.valor,
                   boleta: 0,
                   disponibles: element.disponibles
                }
                this.categorias.push(array);
                }
              });
            }
          }
      }, error => {
        alert(error.error.error_description);
      })
    }
  }
}
