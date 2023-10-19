import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';
import { EmployeeStoreService } from 'src/services/employee-store.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public logged: boolean = false;
  public fullName: string = '';
  public roleName: string = '';

  constructor(private employeeService: EmployeeService,
    private employeeStoreService: EmployeeStoreService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.employeeService.authSubject.subscribe(
      (res) => {
        this.logged = true;
      });

    this.employeeStoreService.getFullName().subscribe(
      (name) => {
        let fullNameFromToken = this.employeeService.getFullNameFromToken();
        this.fullName = name || fullNameFromToken;
      });

    this.employeeStoreService.getRoleFromStore().subscribe(
      (role) => {
        let roleFromToken = this.employeeService.getRoleFromToken();
        this.roleName = role || roleFromToken;
      });
  }

  logout() {
    this.employeeService.logout();
    this.messageService.add({ severity: 'success', summary: 'Logout', detail: 'Sign Out Success' });
    this.logged = false;
  }
}
