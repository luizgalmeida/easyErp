import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ilogin } from 'src/app/interfaces/ilogin';
import { LoginService } from 'src/app/services/login.service';
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
  constructor(
    private loginService : LoginService,
    private router: Router
    ) {}
  
    singIn(user: Ilogin) {
      if(user.email == '' || user.password == ''){
        swal('Error','Fill all the fields.','error',{
          className: "black-swal",
        })
      }
      else{
        this.loginService.login(user).subscribe((response: any) => {
          if (response?.status!=200){
            swal('Error','User not founded.','error')
          }
          else{
            
            this.router.navigate(['/home']);
            // swal('WOW','You found the key!', {
            //   className: "black-swal" 
            // })
          }
        })
      }
      
    }
}
