import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Department } from 'src/models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  departmentapi = environment.departmenturl;

  constructor(private http: HttpClient) { }

  getDepartment() {
    return this.http.get<Department[]>(this.departmentapi + '/' + 'GetDepartments');
  }
}
