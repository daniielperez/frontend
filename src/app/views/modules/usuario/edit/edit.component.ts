import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  loading: boolean;
  formBasic: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _UserService: UserService
  ) { }

  ngOnInit() {
    this.buildFormBasic();
  }

  buildFormBasic() {
    this.formBasic = this.fb.group({
      email: [this.usuario.email, [Validators.required, Validators.email]],
      firstName: [this.usuario.firstName, Validators.required],
      lastName: [this.usuario.lastName, Validators.required],
      password: [this.usuario.password, Validators.required],
      username: [this.usuario.username, Validators.required], 
    });
  }
  onSubmit() {
    this.loading = true;
    this._UserService.edit(this.usuario).subscribe(
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
