import { Component, OnInit } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { User } from '../user';
import { UserService } from '../user.service';
import { AppComponent } from '../app.component'

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class UserCreateComponent implements OnInit {

  user: User = new User;

  name = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);

  constructor(
    private userService: UserService,
    private appComponent: AppComponent,
    private router: Router
  ) { }

  createUser(user: User) {
    if (this.name.value && this.date.value) {
      this.userService.creatUser(user)
        .subscribe(res => {
          this.appComponent.alerts.push({
            type: 'success',
            message: 'User Created',
          });
        }, error => {
          this.appComponent.alerts.push({
            type: 'danger',
            message: 'Server Error',
          });
          return this.userService.errorHandler(error);
        }, () => {
          this.router.navigate([""]);
        })
    }
  }

  ngOnInit() {
  }

}
