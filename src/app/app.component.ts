import { Input, Component } from '@angular/core';

import { Router, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { User } from './user'

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  alerts: Alert[];

  constructor(
    private router: Router,
  ) {
    this.reset();
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  };

  reset() {
    this.alerts = [];
  };
  //from ng-boostrap NgbdCollapseBasic class - navbar collapses in mobile
  public isCollapsed = true;
  public error = true;
}
