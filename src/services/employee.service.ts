import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Employee } from 'src/models/employee';
import { Response } from 'src/models/employee';
import { Login } from 'src/models/login';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { EmployeeStoreService } from './employee-store.service';
import { Token } from '@angular/compiler';

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

  getToken(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token')!;
    return jwtHelper.decodeToken(token);
  }

  public getLoggedInUserId() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.decodeToken();
      var userid = decodedToken.sub;
      return userid;
    }
  }

  validateUser(employee: Employee): void {
    this.http.post<Response>(this.loginapi + '/UserLogin', employee).subscribe(
      {
        next: (res => {
          this.setToken(res.token, employee.username);
          this.validateAuth(true);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Success' });
          const tokenPayload = this.decodeToken();
          this.employeeStoreService.setFullname(tokenPayload.unique_name);
          this.employeeStoreService.setRoleForStore(tokenPayload.role);
          setTimeout(() => { this.router.navigate(['/']) }, 1000);
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

  public authSubject = new BehaviorSubject<boolean>(this.getToken());
  authStatus = this.authSubject.asObservable();
  validateAuth(state: boolean) {
    this.authSubject.next(state);
  }

  getEmployees() {
    return this.http.get<Employee[]>(this.employeeapi + '/' + 'GetEmployees');
  }

  getEmployeeById(id: number) {
    return this.http.get<Employee>(this.employeeapi + '/' + 'GetEmployeeById?Id=' + id);
  }

  postEmployee(newemployee: Employee) {
    return this.http.post<Employee[]>(this.employeeapi + '/' + 'CreateEmployee', newemployee);
  }

  editEmployee(id: number, updatedemployee: Employee) {
    return this.http.put<Employee[]>(this.employeeapi + '/' + 'EditEmployee' + '/' + id, updatedemployee);
  }

  deleteEmployee(id: number, removeEmp: Employee) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: removeEmp,
    };
    return this.http.delete<Employee[]>(this.employeeapi + '/' + 'DeleteEmployee' + '/' + id, options);
  }

  updateStatus(id: number, activity: string): any {
    return this.http.put<Employee[]>(this.employeeapi + '/' + 'UpdateStatus' + '/' + id + '?activity=' + activity, activity).subscribe();
  }

  public status = new BehaviorSubject<string>('');
  activity = this.status.asObservable();
}
