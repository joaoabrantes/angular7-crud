import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { AppComponent } from '../app.component'

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';

import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  users: User[];
  showData: boolean = false;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private appComponent: AppComponent
  ) {
  }

  ngOnInit() {
    this.showUsers();
  }

  open(content) {
    this.modalService.open(content);
  }

  showUsers() {
    this.userService.getAllUsers()
      .subscribe(res => {
        this.users = res;
        // 'No user was found' information only valid after observable is subscribed
        this.showData = true;
      },
        error => {
          this.appComponent.alerts.push({
            type: 'danger',
            message: 'Server Error',
          });
          return this.userService.errorHandler(error);
        })
  }

  removeUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(res => {
        this.appComponent.alerts.push({
          type: 'success',
          message: 'User Deleted',
        });
      }, error => {
        this.appComponent.alerts.push({
          type: 'danger',
          message: 'Server Error',
        });
        return this.userService.errorHandler(error);
      },
        () => {
          //refresh user list
          location.reload();
        }
      )
  }

}
