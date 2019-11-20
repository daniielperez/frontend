import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from '../../../services/empresa.service'; 
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  searchControl: FormControl = new FormControl();
  empresas;
  empresa:any;
  filteredEmpresas;
  formEdit = false;
  formNew = false;
  formIndex = true;
  ulr = environment.ulrImage+"empresa";

  constructor(
    private modalService: NgbModal,
    private _EmpresaService: EmpresaService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() { 
    this._EmpresaService.index().subscribe(
      response => { 
        if(response['code'] == 200){
          this.empresas = [...response['data']];
          this.filteredEmpresas = response['data'];
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
    if(isCreado) {
      this.onInitForms();
      this.formIndex = true;
      this.ngOnInit();
    }
  }

  onNew(content) {
    this.onInitForms();
    this.formNew=true;
    /* this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'lg',backdrop:'static', centered: true})
    .result.then((result) => {
      console.log('result!', result);
    }, (reason) => {
      console.log('Err!', reason);
    }); */
  }

  filerData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.filteredEmpresas = [...this.empresas];
    }

    const columns = Object.keys(this.empresas[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.empresas.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.filteredEmpresas = rows;
  }

  onEdit(content,empresa:any){
    this.empresa = empresa;
    this.onInitForms();
    this.formEdit = true;
    /* this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'lg', backdrop:'static', centered: true})
    .result.then((result) => {
      console.log('result!', result);
    }, (reason) => {
      console.log('Err!', reason);
    }); */
  }

  onDelete(content,empresa:any){
    this.empresa = empresa;
    this.onInitForms();
    this.formEdit = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop:'static', centered: true})
    .result.then((result) => {
      this._EmpresaService.delete(this.empresa).subscribe(
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
    this.formIndex = false;
    return true;
  }
}
