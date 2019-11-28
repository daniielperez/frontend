import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PuntoVentaService } from '../../../../services/puntoVenta.service';


@Component({ 
  selector: 'app-edit-puntoVenta',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() puntoVenta: any = null;

  loading: boolean;
  formBasic: FormGroup;
 
  public datos;
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _PuntoVentaService: PuntoVentaService,
  ) { }

  ngOnInit() {
    this.buildFormBasic();
  }

  buildFormBasic() {
    this.formBasic = this.fb.group({
      nombre: [this.puntoVenta.nombre, Validators.required],
      direccion: [this.puntoVenta.direccion, Validators.required],
      telefono: [this.puntoVenta.telefono, Validators.required], 
    });
  }

  onSubmit() {
    this.loading = true;
    this.datos = {
      id: this.puntoVenta.id,
      nombre: this.puntoVenta.nombre,
      direccion: this.puntoVenta.direccion,
      telefono: this.puntoVenta.telefono
    }
  
    this._PuntoVentaService.edit(this.datos).subscribe(
      response => { 
        if(response['code'] == 200){
          this.ready.emit(true);
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
