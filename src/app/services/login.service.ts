import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Ilogin } from '../interfaces/ilogin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(
    private http: HttpClient,
  ) { }
  login(data: Ilogin) {
    return this.http.post(environment.apiUrl+'authenticate', data);
  }
}