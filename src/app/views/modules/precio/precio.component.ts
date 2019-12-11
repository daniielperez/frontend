import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrecioService } from '../../../services/precio.service'; 
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-precio',
  templateUrl: './precio.component.html',
  styleUrls: ['./precio.component.scss']
})
export class PrecioComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  precios;
  precio: any;
  categoria: any;
  filteredPrecios;
  formEdit = false;
  formNew = false;
  correoComprador;
  userComprador;

  constructor(
    private modalService: NgbModal,
    private rutaActiva: ActivatedRoute,
    private _PrecioService: PrecioService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    let idLoteBoleta = this.rutaActiva.snapshot.params.idLoteBoleta;
    this._PrecioService.index(idLoteBoleta).subscribe( 
      response => {  
        if(response['code'] == 200){
          this.precios = [...response['data']];
          this.filteredPrecios = response['data'];
          this.categoria = response['categoria'];
          console.log(this.categoria);
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
    this.formNew = false;
    if(isCreado) {
      this.ngOnInit();
    }
  }

  filerData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.filteredPrecios = [...this.precios];
    }

    const columns = Object.keys(this.precios[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.precios.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.filteredPrecios = rows;
  }

  onEdit(content,precio:any){
    this.categoria = precio;
    this.onInitForms();
    this.formEdit = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'lg', backdrop:'static', centered: true})
    .result.then((result) => {
      console.log('result!', result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }

  onDelete(content,precio:any){
    this.categoria = precio;
    this.onInitForms();
    this.formEdit = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop:'static', centered: true})
    .result.then((result) => {
      this._PrecioService.delete(this.categoria).subscribe(
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

  onInitForms(){
    this.formNew = false;
    this.formEdit = false;
    return true;
  }

}
