import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EntradaService } from '../../../services/entrada.service'; 
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.scss']
})
export class EntradaComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  entradas;
  entrada:any;
  lugar = false;
  filteredEntradas;
  formEdit = false;
  formNew = false;

  constructor(
    private modalService: NgbModal,
    private rutaActiva: ActivatedRoute,
    private _EntradaService: EntradaService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    let idLugar = this.rutaActiva.snapshot.params.idLugar;
    this._EntradaService.index(idLugar).subscribe(
      response => { 
        if(response['code'] == 200){
          this.entradas = [...response['data']];
          this.filteredEntradas = response['data'];
          this.lugar = response['lugar'];
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
      return this.filteredEntradas = [...this.entradas];
    }

    const columns = Object.keys(this.entradas[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.entradas.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.filteredEntradas = rows;
  }
  onEdit(content,entrada:any){
    this.entrada = entrada;
    this.onInitForms();
    this.formEdit = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'lg', backdrop:'static', centered: true})
    .result.then((result) => {
      console.log('result!', result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }

  onDelete(content,entrada:any){
    this.entrada = entrada;
    this.onInitForms();
    this.formEdit = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop:'static', centered: true})
    .result.then((result) => {
      this._EntradaService.delete(this.entrada).subscribe(
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
