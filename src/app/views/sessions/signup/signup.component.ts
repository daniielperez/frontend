import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from '../../../shared/animations/shared-animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [SharedAnimations]
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
