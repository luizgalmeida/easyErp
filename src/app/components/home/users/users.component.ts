import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { DialogUsersComponent } from './dialog-users/dialog-users.component';
import { Iuser } from 'src/app/interfaces/iuser';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

@ViewChild(MatSort, { static: false }) 

export class UsersComponent implements OnInit, AfterViewInit {
  currentUser
  users = {
    data: [],
    current_page: 1,
    prev_page_url: null,
    next_page_url: null,
    total: null,
    per_page: null,
    to: null,
    from: null,
  };

  loading =false
  urlApi = '';
  permissions = [];
  dataSource: any;
  // tslint:disable-next-line: variable-name
  prev_page_url: any;
  // tslint:disable-next-line: variable-name
  next_page_url: any;
  pageIndex = 0;
  urlFile = '';
  filterValue = '';
  loadingPage = false
  lastPage = 0
  userList=[]
  displayedColumns: string[] = ['photo','userId', 'name' ,'email','active'];
  filterOptions = {
    value: '',
    per_page: 10,
    page:1,
    orderbyoption: {
      type: 'DESC',
      field: 'users.userId'
    }
  }
  constructor(
    public userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    public authService: AuthService) {
    this.urlApi = environment.apiUrl;
    this.currentUser = this.authService.getCurrentUser();
  }

  ngAfterViewInit() {
    this.filter();
    
  }
  ngOnInit() {
  }

  next() {
    ++this.pageIndex
    this.filter();
  }
  prev() {
    --this.pageIndex
    this.filter();
  }

  ordenate(field: any){
    this.userList=[]
    this.pageIndex=1
    if(field!='filter')this.filterOptions.orderbyoption.field = field
    this.filterOptions.orderbyoption.type == 'DESC' ? this.filterOptions.orderbyoption.type='ASC' : this.filterOptions.orderbyoption.type = 'DESC'
    this.filter();
  }

  filter() {
    this.loadingPage = false;
    this.filterOptions.value = this.filterValue
    this.userService.filter(this.filterOptions).subscribe((response: any) => {
      this.loadingPage = false;
      if (response.status !== 200) {
        swal('Error', 'Erro tente novamente mais tarde', 'error');
      } else {
        this.users.data = response.data.rows;
        this.userList= this.userList.concat(this.users.data)
        this.dataSource = new MatTableDataSource<Iuser>(this.userList);
        this.pageIndex = this.users.current_page;
        this.prev_page_url = this.users.prev_page_url;
        this.next_page_url = this.users.next_page_url;
        this.lastPage = response.data.last_page;
      
      }
    });
  }
  open(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = { option: 'new' };
    const dialogRef = this.dialog.open(DialogUsersComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(response => {
    });
  }

  search(user: Iuser): void {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '600px';
      user.option = 'update';
      dialogConfig.data = user;
      const dialogRef = this.dialog.open(DialogUsersComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(response => {
      });
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
  download() {
    if (this.loading) {
      return;
    }
    this.loading = !this.loading;
    this.userService.export(this.filterOptions).subscribe((response: any) => {
      this.loading = !this.loading;
      let download = document.getElementById('fileDownload')
      if (response.error !== 0) {
        if (response.error === 2) {
          swal('Error','Erro ao Exportar os dados', 'error');
        } else {
          this.urlFile = this.urlApi + '../storage/exports/' + response.data;
          
          setTimeout(() => { if (download) download.click(); }, 300);
        }
      }
    });
  }
  
  
}
