import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PuntoEventoService } from '../../../services/puntoEvento.service'; 
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PuntoVentaService } from '../../../services/puntoVenta.service';
import { PuntoEvento } from '../../../model/puntoEvento';
 
@Component({
  selector: 'app-puntoEvento',
  templateUrl: './puntoEvento.component.html',
  styleUrls: ['./puntoEvento.component.scss']
})
export class PuntoEventoComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  formBasic: FormGroup;
  puntoEventos; 
  puntoEventoNew: PuntoEvento;
  puntoEvento;
  evento: any;
  puntos: any;
  puntoSelect: any;
  filteredPuntoVentas;
  formEdit = false;
  formNew = false;
  nombrePunto;
  loading2: boolean;
  loading: boolean;

  constructor(
    private modalService: NgbModal,
    private rutaActiva: ActivatedRoute,
    private _PuntoEventoService: PuntoEventoService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _PuntoVentaService: PuntoVentaService,
    private cdref: ChangeDetectorRef,
  ) { 
    this.puntoEventoNew = new PuntoEvento(null, null, null);
  }

  ngOnInit() {
    this.buildFormBasic(); 
    let idEvento = this.rutaActiva.snapshot.params.idEvento;
    this._PuntoEventoService.index(idEvento).subscribe( 
      response => {  
        if(response['code'] == 200){
          this.puntoEventos = [...response['data']];
          this.filteredPuntoVentas = response['data'];
          this.evento = response['evento'];
        }
    }, error => {
      alert(error.error.error_description);
    })

    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      this.filerData(value);
    });
  } 

  buildFormBasic() {
    this.formBasic = this.fb.group({
      nombrePunto: ['', Validators.required]
    });
  }

  ready(isCreado:any){
    this.formNew = false;
    if(isCreado) {
      this.ngOnInit();
    }
  }

  filerData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.filteredPuntoVentas = [...this.puntoEventos];
    }

    const columns = Object.keys(this.puntoEventos[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.puntoEventos.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.filteredPuntoVentas = rows;
  }


  onDelete(content,puntoEvento:any){
    this.puntoEvento = puntoEvento;
    this.onInitForms();
    this.formEdit = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop:'static', centered: true})
    .result.then((result) => {
      this._PuntoEventoService.delete(this.puntoEvento).subscribe(
        response => { 
          if(response['code'] == 200){
            this.ngOnInit()
            this.toastr.success('Registro eliminado.', 'Perfecto!', {progressBar: true});
            this.modalService.dismissAll();
          }
      }, error => {
          alert(error.error.error_description);
      })
    }, (reason) => {
      console.log('Err!', reason);
    });
  }

  onSubmitBuscarEvento() {
    this.loading = true;
    let array = {
      'nombre': this.nombrePunto
    }
    this._PuntoVentaService.showNombre(array).subscribe( 
      response => { 
        this.loading = false;
        if(response['status'] == 200){
          this.puntos = response['data'];
          this.formNew = false;
        }else{
          this.nombrePunto = "";
          this.toastr.error('Usuario no encontrado', 'Error!', {progressBar: true});
          this.formNew = true;
          this.puntos = false;
          this.cdref.detectChanges(); 
        }
    }, error => {
      this.loading = false;
      alert(error.error.error_description);
    })
  }

  onNew(idPunto) {
    // this.loading2 = true;
    this.puntoEventoNew.evento = this.rutaActiva.snapshot.params.idEvento;;
    this.puntoEventoNew.punto = idPunto;

    this._PuntoEventoService.new(this.puntoEventoNew).subscribe(
      response => { 
        if(response['code'] == 200){
          this.loading2 = false;
          this.toastr.success('Datos guardados.', 'Perfecto!', {progressBar: true});
          this.puntos = false;
          this.ngOnInit();
        }
    }, error => {
      alert(error.error.error_description);
    })
  } 

  onNewPunto(content){
    this.onInitForms();
    this.formEdit = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop:'static', centered: true})
    .result.then((result) => {
      console.log('result!', result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }

  onInitForms(){
    this.formNew = false;
    this.formEdit = false;
    return true;
  }

  onCloseModal(){
    this.modalService.dismissAll();
    this.puntos = false;
    this.nombrePunto = '';
  }

}
