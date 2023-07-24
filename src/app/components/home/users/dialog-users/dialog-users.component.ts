import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../../services/user.service';
import swal from 'sweetalert';
import { Iuser } from '../../../../interfaces/iuser';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog-users',
  templateUrl: './dialog-users.component.html',
  styleUrls: ['./dialog-users.component.scss']
})
export class DialogUsersComponent implements OnInit {

 
  user: Iuser = {
    userId: undefined,
    name: undefined,
    email: '',
    image: undefined,
    access: undefined,
    active: 0
  };
  saveOk = false;
  loading = false;
  option = '';
  currentUser;
  urlApi
  types=[]
  autoCompleteControl = new FormControl();
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogUsersComponent>,
    public dialog: MatDialog,
    public userService: UserService,
    public authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
    this.urlApi = environment.apiUrl;

    this.option = data.option

    }
  
  ngOnInit() { 
    
  }
  cancel(): void {
    this.dialogRef.close();
  }

  initialData(){
   this.loading = false
  }

  save(user: Iuser) {
    if (user.name === undefined || user.name === '' || user.email === undefined || user.email === '' ) {
      swal('Error', 'Campo obrigatório vazio', 'error');
    } 
    else if (!this.emailValid(user.email)){
      swal('Error', 'E-mail inválido', 'error');
    }
    else {
      this.loading = !this.loading;
      this.userService.new(user).subscribe((response: any) => {
        this.loading = !this.loading;
        if (response.status !== 200) {
            swal('Error', 'Erro tente novamente mais tarde', 'error');
        }
        else{
          swal("OK", 'Usuário cadastrado com sucesso', 'success');
        }
      });
    }
  }

  update(user: Iuser) {
    if (user.userId === undefined || user.userId === 0 || user.email != undefined ) {
      swal('Error', 'Campo obrigatório vazio', 'error');
    } 
    else if (!this.emailValid(user.email)){
      swal('Error', 'E-mail inválido', 'error');
    }
    else {
      this.loading = !this.loading;
      this.userService.update(user).subscribe((response: any) => {
        this.loading = !this.loading;
        if (response.status !== 200) {
            swal('Error', 'Erro tente novamente mais tarde', 'error');
        }
        else{
          swal("OK", 'Usuário atualizado com sucesso', 'success');
        }
      });
    }
  }

   delete(user: Iuser) {
    if (this.loading) {
      return;
    }
    if (user.userId === undefined || user.userId === 0) {
      swal('Error', 'Campo obrigatório vazio', 'error');
    } else {
      this.loading = !this.loading;
      this.userService.delete(user.userId).subscribe((response: any) => {
        this.loading = !this.loading;
        if (response.error !== 0) {
            swal('Error', 'Erro tente novamente mais tarde', 'error');
        }
        else{
          swal("OK", 'Ativação atualizada com sucesso', 'success');
        }
      });
    }
  }

  

  emailValid(email: string): boolean {
    // tslint:disable-next-line: max-line-length
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  
}

