import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { environment } from '../../../../../environments/environment';
import { LocalStoreService } from "../../../../services/local-store.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  loading: boolean;
  evento;
  publicidades;
  user;
  boletasUser;
  ulrImage = environment.ulrImage+"publicidad";
  ulr = environment.ulrImage+"publicidad";

  constructor(
    private _UserService: UserService,
    private store: LocalStoreService, 
  ) { }

  ngOnInit() {
    let idUser = this.store.getItem("username")
    this._UserService.show(idUser).subscribe(
      response => { 
        if(response['status'] == 200){
          this.user = response['data']['user'];
          this.boletasUser = response['data']['boletasUser'];
          console.log(this.boletasUser);
        }
    }, error => {
      alert(error.error.error_description); 
    })
  }

}
