import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from '../../../shared/animations/shared-animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStoreService } from "../../../services/local-store.service";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    animations: [SharedAnimations]
})
export class SigninComponent implements OnInit {
    loading: boolean;
    loadingText: string;
    signinForm: FormGroup;
    errorMessage: any;
    json ={
        "grant_type": "password", 
        "client_id": "1_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4", 
        "client_secret": "4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k", 
        "username": "test_user", 
        "password": "123456"
      };
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private _UserService: UserService,
        private toastr: ToastrService,
        private store: LocalStoreService,
    ) { }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
                this.loadingText = 'Cargando modulo principal...';
                this.loading = true;
            }
            if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
                this.loading = false;
            }
        });

        this.signinForm = this.fb.group({
            email: ['test_user', Validators.required],
            password: ['123456', Validators.required]
        });
    }

    signin() {
        this.loading = true;
        this.loadingText = 'Ingresando...';
        this.json.username = this.signinForm.value.email;
        this.json.password = this.signinForm.value.password;

        this._UserService.singin(this.json).subscribe(
            response => { 
                this.loading = false;
                this.store.setItem("token", response);
                this.store.setItem("username", this.json.username);
                this._UserService.show(this.json.username).subscribe(
                    responseUser => { 
                      if(responseUser['status'] == 200){
                          let user = responseUser['data']['user']
                          console.log(user.role);
                            this.store.setItem("idUsuario", user.id);
                            this.store.setItem("role", user.role);
                            this.toastr.success(this.json.username, 'Bienvenido', { timeOut: 4000 });
                            window.location.href = "/dashboard/v1";
                      }
                  }, error => {
                    alert(error.error.error_description); 
                  })
                
          }, error => {
              if(error.error.error_description === 'Invalid username and password combination'){
                this.toastr.error('Usuario o contraseña incorrectos!', 'Credenciales invalidas', { timeOut: 4000 });
                this.loading = false;
            }
          })
    }
}
