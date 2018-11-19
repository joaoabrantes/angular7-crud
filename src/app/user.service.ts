import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from "rxjs";

import { environment } from '../environments/environment';
const API_URL = environment.apiUrl;

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //Route options definition
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  //GET REQUESTS
  private getAllUsersRoute = API_URL + '/api/User';
  private getUserRoute = API_URL + '/api/User/';
  //POST REQUESTS
  private createUserRoute = API_URL + '/api/User';
  private updateUserRoute = API_URL + '/api/User';
  //DELETE REQUEST
  private deleteUserRoute = API_URL + '/api/User/';

  //class needs to be instantiated with http client
  constructor(private http: HttpClient) { }


  /* HTTP REQUESTS METHODS
    getAllUsers returns an Observable object until it's subscribed as an Array of Users
    getUser expects 1 argument to query the users and returns an Observable object
  until it's subscribed as an User

  */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getAllUsersRoute, this.options);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.getUserRoute + id, this.options);
  }

  creatUser(user: User): Observable<{}> {
    return this.http.post(this.createUserRoute, user, this.options);
  }

  updateUser(user: User): Observable<{}> {
    return this.http.post(this.updateUserRoute, user, this.options);
  }

  deleteUser(id: number): Observable<{}> {
    return this.http.delete(this.deleteUserRoute + id, this.options)
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }
}
