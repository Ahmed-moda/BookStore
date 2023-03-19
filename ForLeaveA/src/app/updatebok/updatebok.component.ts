import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookserviceService } from '../Services/bookservice.service';

@Component({
  selector: 'app-updatebok',
  templateUrl: './updatebok.component.html',
  styleUrls: ['./updatebok.component.css']
})
export class UpdatebokComponent implements OnInit {
  errors:string[]=[];
  book:any;
  updated:any;
  public bookForm: FormGroup|any;
  constructor(@Inject(MAT_DIALOG_DATA) public ID:any,private formBuilder: FormBuilder, private bookService: BookserviceService) { }
  get Title(){
    return this.bookForm.get('Title')
  }

  get Author(){
    return this.bookForm.get('Author')
  }
  ngOnInit(): void {
    console.log(this.ID);
    this.bookForm = this.formBuilder.group({
      'Title': ['', Validators.required],
      'Author': ['', Validators.required],
      'id': ''
  });

  this.bookService.getbook(this.ID.Id).subscribe(book => {
    this.book = book;
    this.bookForm.setValue({
      'Title': book.Title,
      'Author': book.Author,
      'id': book.id
    });
  });
}

Update():void{
  if(this.Title?.value==""||this.Author?.value==""){
    if(this.errors.length==0){
      this.errors.push("You should Complete the data")
    }
    
  }
  else{
    this.bookService.Update(this.bookForm.value).subscribe(data=>{
      this.updated=data;
      if(this.updated==true){
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

}
