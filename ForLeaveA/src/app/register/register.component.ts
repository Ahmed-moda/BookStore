import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerform:FormGroup;
  errors:string[]=[];
  model:any;
  constructor(private fb:FormBuilder,private authservice:AuthService, public router: Router) {
    this.registerform=fb.group({
      'FirstName':['',Validators.required],
      'Username':['',Validators.required],
      'Email':['',Validators.required],
      'password':['',Validators.required]
    })
   }

  ngOnInit(): void {
  }

  register():void{
    if(this.Username?.value==""||this.password?.value==""||this.Email?.value==""||this.FirstName?.value==""){
      if(this.errors.length==0){
        this.errors.push("You should Complete the data")
      }
      
    }
    else{
      this.authservice.register(this.registerform.value).subscribe(data=>{
        this.model=data;
        console.log(this.model)
        if(this.model!=undefined&&this.model.Token!=null){
          this.errors=[];
          this.authservice.savetoken(this.model.Token);
          this.router.navigate(['Books']);
        }
        else{
          if(this.errors.length==0){
          this.errors.push(this.model.Message);
          }
        }
      }
        );
       
    }
    
  }


  get Username(){
    return this.registerform.get('Username')
  }

  get password(){
    return this.registerform.get('password')
  }

  get Email(){
    return this.registerform.get('Email')
  }

  get FirstName(){
    return this.registerform.get('FirstName')
  }

}
