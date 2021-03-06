import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PuntoVendedorService } from '../../../services/puntoVendedor.service'; 
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { PuntoVendedor } from '../../../model/puntoVendedor';
 
@Component({
  selector: 'app-puntoVendedor',
  templateUrl: './puntoVendedor.component.html',
  styleUrls: ['./puntoVendedor.component.scss']
})
export class PuntoVendedorComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  formBasic: FormGroup;
  puntoVendedors;
  puntoVendedorNew: PuntoVendedor;
  puntoVendedor;
  punto: any;
  filteredPuntoVendedors;
  formEdit = false;
  formNew = false;
  correoComprador;
  userComprador;
  loading2: boolean;
  loading: boolean;

  constructor(
    private modalService: NgbModal,
    private rutaActiva: ActivatedRoute,
    private _PuntoVendedorService: PuntoVendedorService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _UserService: UserService,
    private cdref: ChangeDetectorRef,
  ) { 
    this.puntoVendedorNew = new PuntoVendedor(null, null, null);
  }

  ngOnInit() {
    this.buildFormBasic(); 
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

  buildFormBasic() {
    this.formBasic = this.fb.group({
      correoComprador: ['', Validators.required]
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

  onSubmitBuscarUsuario() {
    this.loading = true;
    this._UserService.showCorreo(this.correoComprador).subscribe(
      response => { 
        this.loading = false;
        if(response['status'] == 200){
          this.userComprador = response['data'];
          console.log(this.userComprador);
          this.formNew = false;
        }else{
          this.correoComprador = '';
          this.toastr.error('Usuario no encontrado', 'Error!', {progressBar: true});
          this.formNew = true;
          this.cdref.detectChanges(); 
          this.userComprador = false;
        }
    }, error => {
      this.loading = false;
      alert(error.error.error_description);
    })
  }

  onNew() {
    this.loading2 = true;
    this.puntoVendedorNew.vendedor = this.userComprador.id;
    this.puntoVendedorNew.punto = this.punto.id;

    this._PuntoVendedorService.new(this.puntoVendedorNew).subscribe(
      response => { 
        if(response['code'] == 200){
          this.loading2 = false;
          this.toastr.success('Datos guardados.', 'Perfecto!', {progressBar: true});
          this.userComprador = false;
          this.ngOnInit();
        }
    }, error => {
      alert(error.error.error_description);
    })
  }

  onInitForms(){
    this.formNew = false;
    this.formEdit = false;
    return true;
  }

}
