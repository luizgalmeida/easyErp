import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  page= 1
  size = 10
  currentUser
  constructor(
    
    private authService : AuthService,
    private userService : UserService,
    private router: Router
  ){
    this.currentUser = this.authService.getCurrentUser()
    if (!this.currentUser.userId){
      localStorage.removeItem('user')
      this.router.navigate(['/']);
    }

  this.userService.users(this.page,this.size).subscribe((response: any) => {
    console.log(response)
  })
}

}
