import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Employee } from 'src/models/employee';
import { Response } from 'src/models/employee';
import { Login } from 'src/models/login';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { EmployeeStoreService } from './employee-store.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private userPayload: any;
  employeeapi = environment.employeeurl;
  loginapi = environment.loginurl;

  constructor(private http: HttpClient,
    private messageService: MessageService,
    private router: Router,
    private employeeStoreService: EmployeeStoreService) {
    this.userPayload = this.decodeToken();
  }

  setToken(token: string, username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  validateUser(employee: Employee): void {
    this.http.post<Response>(this.employeeapi + '/GetEmployees', employee).subscribe(
      {
        next: (res => {
          this.setToken(res.token, employee.username);
          this.validateAuth(true);
          const tokenPayload = this.decodeToken();
          this.employeeStoreService.setFullname(tokenPayload.unique_name);
          this.employeeStoreService.setRoleForStore(tokenPayload.role);
        }),
        error: (err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Employee Not Found' });
        })
      });
  }

  getFullNameFromToken() {
    if (this.userPayload) {
      return this.userPayload.unique_name;
    }
  }

  getRoleFromToken() {
    if (this.userPayload) {
      return this.userPayload.role;
    }
  }

  public static isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  public authSubject = new Subject<boolean>();

  validateAuth(state: boolean) {
    this.authSubject.next(state);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
    this.validateAuth(false);
  }

  getEmployees() {
    return this.http.get<Employee[]>(this.employeeapi + '/' + 'GetEmployees');
  }

}
