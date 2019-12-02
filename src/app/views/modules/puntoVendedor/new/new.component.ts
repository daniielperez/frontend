import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PuntoVendedorService } from '../../../../services/puntoVendedor.service';
import { UserService } from '../../../../services/user.service';
import { PuntoVendedor } from '../../../../model/puntoVendedor';
import { ActivatedRoute } from '@angular/router'; 
 
@Component({
  selector: 'app-new-puntoVendedor',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  formBasic: FormGroup;
  loading: boolean;
  public puntoVendedor: PuntoVendedor;
  public usuarios;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _PuntoVendedorService: PuntoVendedorService,
    private _UserService: UserService,
    private rutaActiva: ActivatedRoute,
  ) { 
    this.puntoVendedor = new PuntoVendedor(null, null, null);
  }

  ngOnInit() {
    let idPuntoVenta = this.rutaActiva.snapshot.params.idPuntoVenta;
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
      vendedor: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    this.puntoVendedor.punto = this.rutaActiva.snapshot.params.idPuntoVenta;
    this._PuntoVendedorService.new(this.puntoVendedor).subscribe(
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
