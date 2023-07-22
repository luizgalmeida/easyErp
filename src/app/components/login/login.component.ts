import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ilogin } from 'src/app/interfaces/ilogin';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading = false
  user : Ilogin = {
    password : '',
    email:''
  }
  text=false
  currentUser: any
  constructor(
    private authService : AuthService,
    private router: Router
    ) {
      this.currentUser = this.authService.getCurrentUser()
      if(this.currentUser?.userId){
        this.router.navigate(['/home']);
      }
    }
  
    singIn(user: Ilogin) {
      if(user.email == '' || user.password == ''){
        swal('Error','Fill all the fields.','error',{
          className: "black-swal",
        })
      }
      else{
        this.authService.login(user).subscribe((response: any) => {
          if (response.status!=200){
            swal('Error','User not founded.','error')
          }
          else{
            delete response.data.password
            localStorage.setItem('user',JSON.stringify(response.data))
            this.router.navigate(['/home']);
            // swal('WOW','You found the key!', {
            //   className: "black-swal" 
            // })
          }
        },
        (error: HttpErrorResponse) => {
            // Handle error
            // Use if conditions to check error code, this depends on your api, how it sends error messages
        });
      }
      
    }
}
