import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Current, Tutorial, Tutorialtest } from '../models/tutorial.model';

const baseUrl = 'http://localhost:8080/api/data';
const baseUrluser = 'http://localhost:8080/api/data/user';
const baseUrladmin = 'http://localhost:8080/api/data/admin';
const baseUrlhr = 'http://localhost:8080/api/data/hr';
const baseUrlcurrent = 'http://localhost:8080/api/data/current';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(baseUrl);
  }

  gettest(): Observable<Tutorialtest[]> {
    return this.http.get<Tutorialtest[]>("http://localhost:8080/api/data/test");
  }

  getAlluser(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(baseUrluser);
  }

  getAllAdmin(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(baseUrladmin);
  }

  getAllCurrent(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(baseUrlcurrent);
  }

  getAllHr(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(baseUrlhr);
  }

  get(id: any): Observable<Tutorial> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrluser, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }


  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}?title=${title}`);
  }
}
