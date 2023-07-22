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
      return this.http.post('user', data);
    }
    
    export(data?: any) {
      return this.http.post('export/' +(this.currentUser.partnerId ? this.currentUser.partnerId : 0)  ,data);
    }

    //PUT Request
    update(data:Iuser) {
      return this.http.put('user/' + data.userId, data);
    }
    
    updatePassword(data:Iuser) {
      return this.http.put('user-password/' + data.userId, data);
    }

    //DELETE Requests
    delete(userId: number) {
      return this.http.delete('delete-user/' + userId);
    }
  }



