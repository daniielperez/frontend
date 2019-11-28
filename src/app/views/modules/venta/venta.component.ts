import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { VentaService } from '../../../services/venta.service';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStoreService } from "../../../services/local-store.service";
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit { 
  loading: boolean;
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
  puntosVenta;
  formNew = false;
  ulrImage = environment.ulrImage+"publicidad";
  ulr = environment.ulrImage+"publicidad";

  constructor(
    private _VentaService: VentaService,
    private toastr: ToastrService,
    private store: LocalStoreService,
    private fb: FormBuilder,
    private _UserService: UserService,
    private cdref: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.buildFormBasic();
    this._VentaService.ultimoCodigo(this.store.getItem("username")).subscribe(
      response => { 
        if(response['code'] == 200){
          this.codigoVenta = response['codigo'];
          this.puntosVenta = response['puntosVenta'];
          if(this.puntosVenta.length == 0){
            this.toastr.error('Usuario no tiene un punto de venta asignado', 'Error!', {progressBar: true});
          }
        }
    }, error => {
      this.loading = false;
      alert(error.error.error_description);
    })
    
    /* let idEvento = this.rutaActiva.snapshot.params.idEvento;
    this._EventoService.show(idEvento).subscribe(
      response => { 
        if(response['status'] == 200){
          this.evento = response['data']['evento'];
          if(response['data']['evento']['publicidades'][0]){
            this.ulrImage = this.ulrImage+'/'+response['data']['evento']['publicidades'][0].url_imagen;
          }
          this.publicidades = response['data']['evento']['publicidades'];
          this.precios = response['data']['precios'];
          response['data']['categorias'].forEach(element => {
            if(element.disponibles > 0){
             let array = {
               username: this.store.getItem("username"),
               id: element.id, 
               nombre: element.nombre,
               valor: element.valor,
               boleta: 0,
               disponibles: element.disponibles
            }
            this.categorias.push(array);
            }
          });
        }
    }, error => {
      alert(error.error.error_description);
    }) */
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
    let datos = {
      'venta': {
        'codigo': this.codigoVenta,
        'valor_total': this.valorTotal,
        'valor_transaccion': valorTransaccion,
        'valor_venta': this.valorTotal - valorTransaccion,
        'estado': 'PENDIENTE',
        'tipo': 'WEB'
      },
      'detalle': this.categorias,
      'user': this.store.getItem("username")
    }
    this._VentaService.new(datos).subscribe(
      response => { 
        if(response['code'] == 200){
          this.loading = false;
          this.toastr.success('Datos guardados.', 'Perfecto!', {progressBar: true});
          this.testFormElement.nativeElement.submit(); 
        }
    }, error => {
      this.loading = false;
      alert(error.error.error_description);
    })
  }

  onSubmitBuscarUsuario() {
    this.loading = true;
    this._UserService.showCorreo(this.correoComprador).subscribe(
      response => { 
        this.loading = false;
        if(response['status'] == 200){
          this.userComprador = response['data'];
          console.log(this.userComprador);
          this.formNew = false;
        }else{
          this.correoComprador = '';
          this.toastr.error('Usuario no encontrado', 'Error!', {progressBar: true});
          this.formNew = true;
          this.cdref.detectChanges(); 
          this.userComprador = false;
        }
    }, error => {
      this.loading = false;
      alert(error.error.error_description);
    })
  }

  ready(isCreado:any){
    this.formNew = false;
    console.log(isCreado);
  }
}
