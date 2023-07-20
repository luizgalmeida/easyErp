import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilogin } from '../interfaces/ilogin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient) { }

  login(data: Ilogin) {
    return this.http.post(environment.apiUrl+'authenticate', data);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user')|| '{}');
  }
}
