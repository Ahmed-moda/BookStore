import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform:FormGroup;
  errors:string[]=[];
  model:any;
  constructor(private fb:FormBuilder,private authservice:AuthService, public router: Router) {
    this.loginform=this.fb.group({
      'username':['',[Validators.required]],
      'password':['',Validators.required]
    })
   }

  ngOnInit(): void {
  }

  login():void{
    if(this.username?.value==""||this.password?.value==""){
      if(this.errors.length==0){
        this.errors.push("You should Complete the data")
      }
      
    }
    else{
      this.authservice.login(this.loginform.value).subscribe(data=>{
        this.model=data;
        if(this.model!=undefined&&this.model.Token!=null){
          this.errors=[];
          this.authservice.savetoken(this.model.Token);
          this.router.navigate(['']);
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


  get username(){
    return this.loginform.get('username')
  }

  get password(){
    return this.loginform.get('password')
  }

}
