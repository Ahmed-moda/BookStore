import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { BookserviceService } from 'src/app/Services/bookservice.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  public bookform:FormGroup;
  errors:string[]=[];
  model:any;
  constructor(private books:BookserviceService,private fb:FormBuilder,private authservice:AuthService,private router:Router) {
    this.bookform=this.fb.group({
      'Title':['',[Validators.required]],
      'Author':['',Validators.required]
    })
  }
  get Title(){
    return this.bookform.get('Title')
  }

  get Author(){
    return this.bookform.get('Author')
  }
  Add() {
    if(this.Title?.value==""||this.Author?.value==""){
      if(this.errors.length==0){
        this.errors.push("You should Complete the data")
      }
      
    }
    else{
      this.books.Create(this.bookform.value).subscribe(data=>{
        this.model=data;
        console.log(this.model);
        if(this.model==true){
          this.errors=[];
          window.location.reload();
        }
        else{
          if(this.errors.length==0){
          this.errors.push("something happen");
          }
        }
      }
        );
       
    }
    
  }

  ngOnInit(): void {
  }

}
