import { Component, OnInit } from '@angular/core';
import { LocalStoreService } from "./services/local-store.service";
import { Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'bootDash';

  constructor(
    private store: LocalStoreService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.store.getItem("token")) {
      switch (this.store.getItem("role")) {
        case 'ADMIN':
            this.router.navigateByUrl('/dashboard/v1');
            break;
        case 'EMPRESA':
            this.router.navigateByUrl('/modules/cliente/home');
            break;
        case 'VENDEDOR':
            this.router.navigateByUrl('/modules/venta');
            break;
        case 'CLIENTE':
            this.router.navigateByUrl('/modules/cliente/home');
            break;
      }
    } else {
      this.router.navigateByUrl('/sessions/signin');
    }
  }
}
