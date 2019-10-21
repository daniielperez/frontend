import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  public usuario: Usuario;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _UserService: UserService,
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
    });
  }

  onSubmit() {
    this.loading = true;
    this._UserService.new(this.usuario).subscribe(
      response => { 
        if(response['code'] == 200){
          this.ready.emit(true);
          this.modalService.dismissAll();
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
