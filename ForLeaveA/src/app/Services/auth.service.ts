import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpParams} from'@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private loginpath=environment.apiurl+"Authentication/Login";
private registerpath=environment.apiurl+"Authentication/register";
  constructor(private http:HttpClient) { 
    
  }
  login(data: any):Observable<any>{
   let queryparam=new HttpParams().set('user',data.username).set('pas',data.password);
    return this.http.get(this.loginpath,{params:queryparam})
  }

  register(data: any):Observable<any>{
    return this.http.post(this.registerpath,data)
  }

  savetoken(data:any):void{
    localStorage.setItem('token',data);
  }
  gettoken():any{
   return localStorage.getItem('token');
  }
  public isAuthenticated(): boolean {
    const token = this.gettoken();
    // Check whether the token is expired and return
    // true or false
    if(token){
      return true
    }
    else{
      return false;
    }
   
  }
}
