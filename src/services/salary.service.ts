import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Salary } from 'src/models/salary';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  salaryapi = environment.salaryurl;

  constructor(private http: HttpClient) { }

  getSalary() {
    return this.http.get<Salary[]>(this.salaryapi + '/' + 'GetSalary');
  }
}
