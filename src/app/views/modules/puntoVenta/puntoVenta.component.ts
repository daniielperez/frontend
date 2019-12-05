import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PuntoVentaService } from '../../../services/puntoVenta.service'; 
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-puntoVenta',
  templateUrl: './puntoVenta.component.html',
  styleUrls: ['./puntoVenta.component.scss']
})
export class PuntoVentaComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  puntoVentas;
  puntoVenta:any;
  filteredPuntoVentas;
  formEdit = false;
  formNew = false;

  constructor(
    private modalService: NgbModal,
    private _PuntoVentaService: PuntoVentaService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this._PuntoVentaService.index().subscribe(
      response => { 
        if(response['code'] == 200){
          this.puntoVentas = [...response['data']];
          this.filteredPuntoVentas = response['data'];
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
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'lg',backdrop:'static', centered: true})
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
      return this.filteredPuntoVentas = [...this.puntoVentas];
    }

    const columns = Object.keys(this.puntoVentas[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.puntoVentas.filter(function(d) {
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
  onEdit(content,puntoVenta:any){
    this.puntoVenta = puntoVenta;
    this.onInitForms();
    this.formEdit = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'lg', backdrop:'static', centered: true})
    .result.then((result) => {
      console.log('result!', result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }

  onDelete(content,puntoVenta:any){
    this.puntoVenta = puntoVenta;
    this.onInitForms();
    this.formEdit = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop:'static', centered: true})
    .result.then((result) => {
      this._PuntoVentaService.delete(this.puntoVenta).subscribe(
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
