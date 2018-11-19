import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import FormsModule to use ngModel directive
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms';
//import HttpClientModule to use http client api
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { FilterUsersPipe } from './filter-users.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserDetailComponent,
    UserCreateComponent,
    FilterUsersPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
