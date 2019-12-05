import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PuntoVentaService } from '../../../../services/puntoVenta.service';
import { PuntoVenta } from '../../../../model/puntoVenta';
 
@Component({
  selector: 'app-new-puntoVenta',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  formBasic: FormGroup;
  loading: boolean;
  public puntoVenta: PuntoVenta;
  public usuarios;
  public eventos;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _PuntoVentaService: PuntoVentaService,
  ){ 
    this.puntoVenta = new PuntoVenta(null, null, null, null);
  }

  ngOnInit() {
    this.buildFormBasic();
  } 

  buildFormBasic() {
    this.formBasic = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    this._PuntoVentaService.new(this.puntoVenta).subscribe(
      response => { 
        if(response['code'] == 200){
          this.loading = false;
          this.ready.emit(true);
          this.toastr.success('Datos guardados.', 'Perfecto!', {progressBar: true});
        }
    },error => {
      alert(error.error.error_description);
    })
  } 

  onCloseModal(){
    this.modalService.dismissAll();
    this.ready.emit(true);
  }

}
