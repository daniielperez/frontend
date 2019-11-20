import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LugarService } from '../../../services/lugar.service'; 
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.component.html',
  styleUrls: ['./lugar.component.scss']
})
export class LugarComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  lugares;
  lugar:any;
  filteredLugares;
  formEdit = false;
  formNew = false;
  formIndex = true;
  lat = 1.218245;
  lng = 77.280313;

  constructor(
    private modalService: NgbModal,
    private _LugarService: LugarService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this._LugarService.index().subscribe(
      response => { 
        if(response['code'] == 200){
          this.lugares = [...response['data']];
          this.filteredLugares = response['data'];
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
  }

  filerData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.filteredLugares = [...this.lugares];
    }

    const columns = Object.keys(this.lugares[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.lugares.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.filteredLugares = rows;
  }
  onEdit(content,lugar:any){
    this.lugar = lugar;
    this.onInitForms();
    this.formEdit = true;
  }

  onDelete(content,lugar:any){
    this.lugar = lugar;
    this.onInitForms();
    this.formEdit = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop:'static', centered: true})
    .result.then((result) => {
      this._LugarService.delete(this.lugar).subscribe(
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
    this.formIndex = false;
    return true;
  }

}
