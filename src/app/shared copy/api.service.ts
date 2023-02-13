import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postEmployee(data : any): Observable<any>{
    return this.http.post('http://localhost:8080/api/data/user',data)
    .pipe(map((res:any)=>{
      return res;
    }) )
  }

  postimg(data : any): Observable<any>{
    return this.http.post('http://localhost:8080/api/data/upload',data)
    .pipe(map((res:any)=>{
      return res;
    }) )
  }

  postEmployeetest(data : any): Observable<any>{
    return this.http.post('http://localhost:8080/api/data/test',data)
    .pipe(map((res:any)=>{
      return res;
    }) )
  }

  postrole(data : any): Observable<any>{
    return this.http.post('http://localhost:8080/api/data/role',data)
    .pipe(map((res:any)=>{
      return res;
    }) )
  }

  postCurrent(data : any,eid:number): Observable<any>{
    return this.http.put("http://localhost:8080/api/data/current/"+eid,data)
    .pipe(map((res:any)=>{
      return res;
    }) )
  }

  getCurrent(): Observable<any>{
    return this.http.get("http://localhost:8080/api/data/current")
    .pipe(map((res:any)=>{
      return res;
    }) )
  }


  getEmployee(){
    return this.http.get<any>("http://localhost:8080/api/data/user")
    .pipe(map((res:any)=>{
      return res;
    }) )
  }

  getAllrole(){
    return this.http.get<any>("http://localhost:8080/api/data/role")
    .pipe(map((res:any)=>{
      return res;
    }) )
  }

  updateEmployee(data : any,eid: number){
    return this.http.put<any>("http://localhost:8080/api/data/user/"+eid,data)
    .pipe(map((res:any)=>{
      return res;
    }) )
  }

  updaterole(data : any,rid: string){
    return this.http.put<any>("http://localhost:8080/api/data/role/"+rid,data)
    .pipe(map((res:any)=>{
      return res;
    }) )
  }



  deleteEmployee(eid : number){
    return this.http.delete<any>("http://localhost:8080/api/data/user/"+eid)
    .pipe(map((res:any)=>{
      return res;
    }) )
  }
  deleterole(rid : string){
    return this.http.delete<any>("http://localhost:8080/api/data/role/"+rid)
    .pipe(map((res:any)=>{
      return res;
    }) )
  }
}
