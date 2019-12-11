import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrecioService } from '../../../../services/precio.service';
import { UserService } from '../../../../services/user.service';

@Component({ 
  selector: 'app-edit-precio',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() precio: any = null;

  loading: boolean;
  formBasic: FormGroup;

  public usuarios;
  public vendedorSelect;
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _PrecioService: PrecioService,
    private _UserService: UserService,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log(this.precio);
    this._UserService.select().subscribe(
      response => { 
        this.usuarios = response;
        setTimeout(() => {
          this.vendedorSelect = [this.precio.vendedor.id];
          this.cdref.detectChanges();
        });
    }, error => {
      alert(error.error.error_description);
    });
    this.buildFormBasic();
  }

  buildFormBasic() {
    this.formBasic = this.fb.group({
      vendedorSelect: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    let arrayDatos = {
      id: this.precio.id,
      nombre: this.precio.nombre,
      vendedor: this.vendedorSelect.toString(),
      punto: this.precio.punto.id,
    };
    this._PrecioService.edit(arrayDatos).subscribe(
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
