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
      // this.router.navigateByUrl('/dashboard/v1');
      this.router.navigateByUrl('/modules/entrada/1');
    } else {
      this.router.navigateByUrl('/sessions/signin');
    }
  }
}
