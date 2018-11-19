import { Component, OnInit, Input } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { User } from '../user'
import { UserService } from '../user.service'
import { AppComponent } from '../app.component'

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class UserDetailComponent implements OnInit {

  show: boolean = false;

  user: User;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private appComponent: AppComponent
  ) {
  }

  showUser() {
    //Get id from url params to get user by id
    this.route.params.subscribe(res => this.id = res.id);
    this.userService.getUser(this.id)
      .subscribe(user => {
        this.user = user;
        this.show = !this.show;
      }, error => {
        this.appComponent.alerts.push({
          type: 'danger',
          message: 'Server Error',
        });
        return this.userService.errorHandler(error);
      })
  }

  editUser(user: User) {
    if (this.user.name.length > 0) {
      this.userService.updateUser(user)
        .subscribe(res => {
          this.appComponent.alerts.push({
            type: 'success',
            message: 'User Edited',
          });
        }, error => {
          this.appComponent.alerts.push({
            type: 'danger',
            message: 'Server Error',
          });
          return this.userService.errorHandler(error);
        },
        () => {
          this.router.navigate([""]);
        })
    }
  }

  ngOnInit() {
    this.showUser();
  }

}
