import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpParams} from'@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {
  private Getbookspath=environment.apiurl+"Books/Getall";
  private createbookspath=environment.apiurl+"Books/Create";
  private updatebookspath=environment.apiurl+"Books/Update";
  private Deletebookspath=environment.apiurl+"Books/Delete";
  private getbookspath=environment.apiurl+"Books/Getbook";
  constructor(private http:HttpClient) { }
  Getall():Observable<any>{
     return this.http.get(this.Getbookspath)
   }

   Create(data: any):Observable<any>{
    return this.http.post(this.createbookspath,data)
  }
  Delete(data: any  ):Observable<any>{
    console.log(data)
    let queryparam=new HttpParams().set('id',data);
    return this.http.get(this.Deletebookspath,{params:queryparam})
  }
  getbook(data: any  ):Observable<any>{
    let queryparam=new HttpParams().set('id',data);
    return this.http.get(this.getbookspath,{params:queryparam})
  }

  Update(data: any):Observable<any>{
    return this.http.post(this.updatebookspath,data)
  }
  
}
