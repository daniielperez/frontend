import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() usuario: any = null;

  datos 
  rolSelected;

  loading: boolean;
  formBasic: FormGroup;
  roles = [
    {label:'ADMIN',value:'ADMIN'},
    {label:'CLIENTE',value:'CLIENTE'},
    {label:'EMPRESA',value:'EMPRESA'},
    {label:'VENDEDOR',value:'VENDEDOR'},
  ];
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _UserService: UserService,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    
    setTimeout(() => {
      this.rolSelected = [this.usuario.roles[0]];
      console.log(this.rolSelected);
      this.cdref.detectChanges();
    });
    this.buildFormBasic();
  }

  buildFormBasic() {
    this.formBasic = this.fb.group({
      email: [this.usuario.email, [Validators.required, Validators.email]],
      firstName: [this.usuario.firstName, Validators.required],
      lastName: [this.usuario.lastName, Validators.required],
      password: [this.usuario.password, Validators.required],
      username: [this.usuario.username, Validators.required], 
      roles: ['', Validators.required], 
    });
  }
  onSubmit() {
    this.loading = true;
    let usuarioArray = {
      id: this.usuario.id,
      username: this.usuario.username,
      email: this.usuario.email,
      password: this.usuario.password,
      firstName: this.usuario.firstName,
      lastName: this.usuario.lastName,
    };
    let data = {
      usuario: usuarioArray,
      roles: [this.rolSelected]
    }
    this._UserService.edit(data).subscribe(
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
