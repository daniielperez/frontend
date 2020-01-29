import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../../services/evento.service';
import { VentaService } from '../../../../services/venta.service';
import { environment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { LocalStoreService } from "../../../../services/local-store.service";
import {Md5} from 'ts-md5/dist/md5';


@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit { 
  loading: boolean;
  @ViewChild('testForm', {static: false}) testFormElement; 
  evento;
  categoriaDes=[];
  publicidades;
  precios;
  email;
  codigoVenta;
  signature;
  merchantId = 508029;
  accountId = 512321;
  apiKey = '4Vj8eK4rloUd272L48hsrarnUA';
  valorTotal = 0;
  categorias = [];
  ulrImage = environment.ulrImage+"publicidad";
  ulr = environment.ulrImage+"publicidad";

  constructor(
    private rutaActiva: ActivatedRoute,
    private _EventoService: EventoService,
    private _VentaService: VentaService,
    private toastr: ToastrService,
    private store: LocalStoreService,
  ) { }

  ngOnInit() {
    this._VentaService.ultimoCodigo(this.store.getItem("username")).subscribe(
      response => { 
        if(response['code'] == 200){
          this.codigoVenta = response['codigo'];
          this.email = response['correo'];
        }
    }, error => {
      this.loading = false;
      alert(error.error.error_description);
    })
    
    let idEvento = this.rutaActiva.snapshot.params.idEvento;
    this._EventoService.show(idEvento).subscribe(
      response => { 
        if(response['status'] == 200){
          this.evento = response['data']['evento'];
          if(response['data']['evento']['publicidades'][0]){
            this.ulrImage = this.ulrImage+'/'+response['data']['evento']['publicidades'][0].url_imagen;
          }
          this.publicidades = response['data']['evento']['publicidades'];
          this.precios = response['data']['precios'];
          if (response['data']['categorias']) {
            response['data']['categorias'].forEach(element => {
              if(element.disponibles > 0){
               let array = {
                 username: this.store.getItem("username"),
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

    const md5 = new Md5();
    this.signature = md5.appendStr(this.apiKey+'~'+this.merchantId+'~'+this.codigoVenta+'~'+this.valorTotal+'~COP').end();
    
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
        'estado': 'PENDIENTE',
        'tipo': 'WEB' 
      },
      'detalle': this.categoriaDes,
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
}
