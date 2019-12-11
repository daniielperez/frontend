import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoteBoletaService } from '../../../services/loteBoleta.service'; 
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-loteBoleta',
  templateUrl: './loteBoleta.component.html',
  styleUrls: ['./loteBoleta.component.scss']
})
export class LoteBoletaComponent implements OnInit {

  searchControl: FormControl = new FormControl();
  @Input() idEvento: any = null;
  loteBoletas;
  loteBoleta:any;
  filteredLoteBoletas;
  formEdit = false;
  formNew = false;

  constructor(
    private modalService: NgbModal,
    private _LoteBoletaService: LoteBoletaService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() { 
    let data = {
      idEvento:this.idEvento
    };
    this._LoteBoletaService.index(data).subscribe(
      response => { 
        if(response['code'] == 200){
          this.loteBoletas = [...response['data']];
          this.filteredLoteBoletas = response['data'];
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
      return this.filteredLoteBoletas = [...this.loteBoletas];
    }

    const columns = Object.keys(this.loteBoletas[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.loteBoletas.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.filteredLoteBoletas = rows;
  }
  onEdit(content,loteBoleta:any){
    this.loteBoleta = loteBoleta;
    this.onInitForms();
    this.formEdit = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'lg', backdrop:'static', centered: true})
    .result.then((result) => {
      console.log('result!', result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }

  onDelete(content,loteBoleta:any){
    this.loteBoleta = loteBoleta;
    this.onInitForms();
    this.formEdit = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop:'static', centered: true})
    .result.then((result) => {
      this._LoteBoletaService.delete(this.loteBoleta).subscribe(
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
