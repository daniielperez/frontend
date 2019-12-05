import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EntradaService } from '../../../../services/entrada.service';
import { UserService } from '../../../../services/user.service';

@Component({ 
  selector: 'app-edit-entrada',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() entrada: any = null;

  loading: boolean;
  formBasic: FormGroup;

  public usuarios;
  public responsableSelect;
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _EntradaService: EntradaService,
    private _UserService: UserService,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this._UserService.select().subscribe(
      response => { 
        this.usuarios = response;
        setTimeout(() => {
          this.responsableSelect = [this.entrada.responsable.id];
          this.cdref.detectChanges();
        });
    }, error => {
      alert(error.error.error_description);
    });
    this.buildFormBasic();
  }

  buildFormBasic() {
    this.formBasic = this.fb.group({
      nombre: [this.entrada.nombre, Validators.required],
      responsableSelect: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    let arrayDatos = {
      id: this.entrada.id,
      nombre: this.entrada.nombre,
      responsable: this.responsableSelect.toString(),
      lugar: this.entrada.lugar.id,
    };
    this._EntradaService.edit(arrayDatos).subscribe(
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
