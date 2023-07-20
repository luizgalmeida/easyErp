import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilogin } from '../interfaces/ilogin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient) { }
  
    users(page: number, size:number) {
      return this.http.get(environment.apiUrl+'users?page='+page+'&size='+size);
    }
  }



