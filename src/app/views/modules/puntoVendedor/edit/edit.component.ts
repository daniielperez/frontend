import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PuntoVendedorService } from '../../../../services/puntoVendedor.service';
import { UserService } from '../../../../services/user.service';

@Component({ 
  selector: 'app-edit-puntoVendedor',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() puntoVendedor: any = null;

  loading: boolean;
  formBasic: FormGroup;

  public usuarios;
  public responsableSelect;
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _PuntoVendedorService: PuntoVendedorService,
    private _UserService: UserService,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this._UserService.select().subscribe(
      response => { 
        this.usuarios = response;
        setTimeout(() => {
          this.responsableSelect = [this.puntoVendedor.responsable.id];
          this.cdref.detectChanges();
        });
    }, error => {
      alert(error.error.error_description);
    });
    this.buildFormBasic();
  }

  buildFormBasic() {
    this.formBasic = this.fb.group({
      nombre: [this.puntoVendedor.nombre, Validators.required],
      responsableSelect: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    let arrayDatos = {
      id: this.puntoVendedor.id,
      nombre: this.puntoVendedor.nombre,
      responsable: this.puntoVendedor.responsable.id,
      lugar: this.puntoVendedor.lugar.id,
    };
    this._PuntoVendedorService.edit(arrayDatos).subscribe(
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
