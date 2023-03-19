import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './Services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BooksComponent } from './books/books.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { BookserviceService } from './Services/bookservice.service';
import { AddBookComponent } from './books/add-book/add-book.component';
import { HomeComponent } from './home/home.component';
import { UpdatebokComponent } from './updatebok/updatebok.component';
  





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    BooksComponent,
    AddBookComponent,
    HomeComponent,
    UpdatebokComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [AuthService,BookserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
