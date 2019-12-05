import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventoService } from '../../../services/evento.service'; 
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoConfigComponent implements OnInit {
 
  searchControl: FormControl = new FormControl();
  eventos;
  evento:any;
  filteredEventos;
  formEdit = false;
  formNew = false;

  constructor(
    private modalService: NgbModal,
    private _EventoService: EventoService,
    private toastr: ToastrService,
    private rutaActiva: ActivatedRoute,
  ) { }

  ngOnInit() { 
    let idEmpresa = this.rutaActiva.snapshot.params.idEmpresa;
    this._EventoService.index(idEmpresa).subscribe(
      response => { 
        if(response['code'] == 200){
          this.eventos = [...response['data']];
          this.filteredEventos = response['data'];
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
      return this.filteredEventos = [...this.eventos];
    }

    const columns = Object.keys(this.eventos[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.eventos.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.filteredEventos = rows;
  }
  onEdit(content,evento:any){
    this.evento = evento;
    this.onInitForms();
    this.formEdit = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'lg', backdrop:'static', centered: true})
    .result.then((result) => {
      console.log('result!', result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }

  onDelete(content,evento:any){
    this.evento = evento;
    this.onInitForms();
    this.formEdit = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop:'static', centered: true})
    .result.then((result) => {
      this._EventoService.delete(this.evento).subscribe(
        response => { 
          if(response['code'] == 200){
            this.ngOnInit();
            this.toastr.success('Registro eliminado.', 'Perfecto!', {progressBar: true});
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
