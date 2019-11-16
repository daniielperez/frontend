import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from '../../../../services/empresa.service';

@Component({
  selector: 'app-edit-empresa',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() empresa: any = null;
  
  correos;
  telefonos;
  itemsCorreos=[];
  itemsTelefonos=[];

  loading: boolean;
  formBasic: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _EmpresaService: EmpresaService,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.correos = new FormControl(this.empresa.correos);
    this.telefonos = new FormControl(this.empresa.telefonos);
    this.buildFormBasic();
  } 
  
  buildFormBasic() {
    this.formBasic = this.fb.group({
      nombre: [this.empresa.nombre, Validators.required],
      nit: [this.empresa.nit, Validators.required],
      logo: [this.empresa.logo, Validators.required],
      portada: [this.empresa.portada, Validators.required],
      direccion: [this.empresa.direccion, Validators.required],
      lat: [this.empresa.lat, Validators.required],
      lng: [this.empresa.lng, Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    let empresa = {
      id: this.empresa.id,
      nombre: this.empresa.nombre, 
      nit: this.empresa.nit, 
      logo: this.empresa.logo, 
      portada: this.empresa.portada, 
      direccion: this.empresa.direccion, 
      lat: this.empresa.lat, 
      lng: this.empresa.lng, 
    };
    let array = {
      empresa: empresa,
      correos: this.correos,
      telefonos: this.telefonos
    }
    this._EmpresaService.edit(array).subscribe(
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
