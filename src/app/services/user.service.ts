import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilogin } from '../interfaces/ilogin';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Iuser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser:any
  constructor(
    private http: HttpClient,
    private authService: AuthService) {
      this.currentUser = this.authService.getCurrentUser()
     }
  
    //  Get Requests
    

    // Post Requests
    filter(data: any) {
      data.partnerId = this.currentUser.partnerId
      return this.http.post(environment.apiUrl+'users',data);
    }

    new(data:Iuser) {
      return this.http.post(environment.apiUrl+'user', data);
    }
    
    export(data?: any) {
      return this.http.post(environment.apiUrl+'export' ,data);
    }

    //PUT Request
    update(data:Iuser) {
      return this.http.put(environment.apiUrl+'user/' + data.userId, data);
    }
    
    updatePassword(data:Iuser) {
      return this.http.put(environment.apiUrl+'user-password/' + data.userId, data);
    }

    //DELETE Requests
    delete(userId: number) {
      return this.http.delete(environment.apiUrl+'user/' + userId);
    }
  }



