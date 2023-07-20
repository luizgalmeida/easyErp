import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { InitComponent } from './components/home/init/init.component';
import { UsersComponent } from './components/home/users/users.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home',  component: HomeComponent,
    children: [
      { path: '', component: InitComponent },
      { path: 'users', component: UsersComponent },
      { path: '**', component: InitComponent },
    ]},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
