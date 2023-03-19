import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BookserviceService } from '../Services/bookservice.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddBookComponent } from './add-book/add-book.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UpdatebokComponent } from '../updatebok/updatebok.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements AfterViewInit  {
 
  constructor(private books:BookserviceService,public dialog: MatDialog) {
    
   }

  ngOnInit(): void {
    this.get()
  }
  displayedColumns: string[] = [ 'Title', 'Author'];
  blh:any;
  Books:book[]=[];
  dataSource = new MatTableDataSource<book>(this.Books);
  @ViewChild(MatPaginator) paginator: MatPaginator|any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  get():void{
    this.books.Getall().subscribe((data: any)=>
      this.Books=data
      )
  }
  openAddDialog() {
    this.dialog.open(AddBookComponent,{
      height: '500px',
      width: '500px',
    });
  }
  openUpdateDialog(ID:any) {
    console.log(ID);
    this.dialog.open(UpdatebokComponent,{
      height: '500px',
      width: '500px',
      data:{
        Id:ID
      }
    });
  }

  Delete(id:number):void{
    console.log(id)
    console.log("AA")
    this.books.Delete(id).subscribe((data: any)=>
      {
        console.log(data)
        if(data==true){
          window.location.reload()
        }
        else{
          Swal.fire('Oops...', 'Something went wrong!', 'error')  
        }
      }
      )
  }
  
  
} 
export interface book {
  id:number;
  Title: string;
  Author: string;
}




  