import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaService } from '../../../services/categoria.service'; 
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  searchControl: FormControl = new FormControl();
  categorias;
  categoria:any;
  filteredCategorias;
  formEdit = false;
  formNew = false;

  constructor(
    private modalService: NgbModal,
    private _CategoriaService: CategoriaService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() { 
    this._CategoriaService.index().subscribe(
      response => { 
        if(response['code'] == 200){
          this.categorias = [...response['data']];
          this.filteredCategorias = response['data'];
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
      return this.filteredCategorias = [...this.categorias];
    }

    const columns = Object.keys(this.categorias[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.categorias.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.filteredCategorias = rows;
  }
  onEdit(content,categoria:any){
    this.categoria = categoria;
    this.onInitForms();
    this.formEdit = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'lg', backdrop:'static', centered: true})
    .result.then((result) => {
      console.log('result!', result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }

  onDelete(content,categoria:any){
    this.categoria = categoria;
    this.onInitForms();
    this.formEdit = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop:'static', centered: true})
    .result.then((result) => {
      this._CategoriaService.delete(this.categoria).subscribe(
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
