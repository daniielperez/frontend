import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PuntoVendedorService } from '../../../services/puntoVendedor.service'; 
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-puntoVendedor',
  templateUrl: './puntoVendedor.component.html',
  styleUrls: ['./puntoVendedor.component.scss']
})
export class PuntoVendedorComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  puntoVendedors;
  puntoVendedor:any;
  punto = false;
  filteredPuntoVendedors;
  formEdit = false;
  formNew = false;

  constructor(
    private modalService: NgbModal,
    private rutaActiva: ActivatedRoute,
    private _PuntoVendedorService: PuntoVendedorService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    let idPuntoVenta = this.rutaActiva.snapshot.params.idPuntoVenta;
    this._PuntoVendedorService.index(idPuntoVenta).subscribe( 
      response => { 
        if(response['code'] == 200){
          this.puntoVendedors = [...response['data']];
          this.filteredPuntoVendedors = response['data'];
          this.punto = response['puntoVenta'];
          this.modalService.dismissAll();
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

  ready(isCreado:any){
    console.log(isCreado);
    if(isCreado) {
      this.ngOnInit();
    }
  }

  onNew(content) {
    this.onInitForms();
    this.formNew=true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'sm',backdrop:'static', centered: true})
    .result.then((result) => {
      console.log('result!', result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }

  filerData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.filteredPuntoVendedors = [...this.puntoVendedors];
    }

    const columns = Object.keys(this.puntoVendedors[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.puntoVendedors.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.filteredPuntoVendedors = rows;
  }

  onEdit(content,puntoVendedor:any){
    this.puntoVendedor = puntoVendedor;
    this.onInitForms();
    this.formEdit = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'sm', backdrop:'static', centered: true})
    .result.then((result) => {
      console.log('result!', result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }

  onDelete(content,puntoVendedor:any){
    this.puntoVendedor = puntoVendedor;
    this.onInitForms();
    this.formEdit = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop:'static', centered: true})
    .result.then((result) => {
      this._PuntoVendedorService.delete(this.puntoVendedor).subscribe(
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
  onInitForms(){
    this.formNew = false;
    this.formEdit = false;
    return true;
  }

}
