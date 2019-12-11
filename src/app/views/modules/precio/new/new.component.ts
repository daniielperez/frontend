import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrecioService } from '../../../../services/precio.service';
import { UserService } from '../../../../services/user.service';
import { Precio } from '../../../../model/precio';
import { ActivatedRoute } from '@angular/router'; 
 
@Component({
  selector: 'app-new-precio',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  formBasic: FormGroup;
  loading: boolean;
  public precio: Precio;
  public usuarios;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _PrecioService: PrecioService,
    private _UserService: UserService,
    private rutaActiva: ActivatedRoute,
  ) { 
    this.precio = new Precio(null, null, null , null, null);
  }

  ngOnInit() {
    this._UserService.select().subscribe(
      response => { 
        this.usuarios = response;
    }, error => {
      alert(error.error.error_description);
    });
    this.buildFormBasic();
  } 

  buildFormBasic() {
    this.formBasic = this.fb.group({
      valor: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    this.precio.loteBoleta = this.rutaActiva.snapshot.params.idLoteBoleta;
    this._PrecioService.new(this.precio).subscribe(
      response => { 
        if(response['code'] == 200){
          this.ready.emit(true);
          this.loading = false;
          this.toastr.success('Datos guardados.', 'Perfecto!', {progressBar: true});
        }
    }, error => {
      alert(error.error.error_description);
    })
  }

  onCloseModal(){
    this.modalService.dismissAll();
  }

}
