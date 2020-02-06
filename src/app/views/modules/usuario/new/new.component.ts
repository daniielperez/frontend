import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../../services/user.service';
import { Usuario } from '../../../../model/usuario';

@Component({
  selector: 'app-new-usuario',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  formBasic: FormGroup;
  loading: boolean;
  rolSelected: any = 'ADMIN';
  roles = [
    {label:'ADMIN',value:'ADMIN'},
    {label:'CLIENTE',value:'CLIENTE'},
    {label:'EMPRESA',value:'EMPRESA'},
    {label:'VENDEDOR',value:'VENDEDOR'},
  ];
  public usuario: Usuario;
  constructor( 
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _UserService: UserService,
    private cdref: ChangeDetectorRef
  ) { 
    this.usuario = new Usuario(null, null, null, null, null, null);
  }

  ngOnInit() {
    this.buildFormBasic();
  }

  buildFormBasic() {
    this.formBasic = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      username: ['', Validators.required], 
      roles: ['ADMIN', Validators.required], 
    });
    this.cdref.detectChanges();
  }

  onSubmit() {
    this.loading = true;
    let data = {
      usuario: this.usuario,
      roles: [this.rolSelected]
    }
    this._UserService.new(data).subscribe(
      response => { 
        if(response['code'] == 200){
          this.ready.emit(true);
          this.toastr.success('Datos guardados.', 'Perfecto!', {progressBar: true});
        }
        if(response['code'] == 400){
          this.toastr.error(response['message'], 'Error!', {progressBar: true});
          this.loading = false;
        }
    }, error => {
      alert(error.error.error_description);
    })
}

  onCloseModal(){
    this.modalService.dismissAll();
    this.ready.emit(false);
  }
}
