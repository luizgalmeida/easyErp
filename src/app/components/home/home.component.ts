import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentUser:any
  firstName=''
  constructor(
    
    private authService : AuthService,
    private router: Router
  ){
    this.currentUser = this.authService.getCurrentUser()
    if (!this.currentUser.userId){
      localStorage.removeItem('user')
      this.router.navigate(['/']);
    }
    this.firstName = this.currentUser.name.substring(0,this.currentUser.name.indexOf(' ') )
  }

  logout(){
    localStorage.removeItem('user')
    this.router.navigate(['/']);

  }
}
