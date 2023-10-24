import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/models/employee';
import { EmployeeService } from 'src/services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allemployees',
  templateUrl: './allemployees.component.html',
  styleUrls: ['./allemployees.component.css']
})
export class AllemployeesComponent implements OnInit {

  employeedata: Employee | any;

  empId!: number;

  constructor(private employeeservice: EmployeeService,
    private router: Router,) { }

  ngOnInit(): void {
    this.employeeservice.getEmployees().subscribe(
      (res) => {
        this.employeedata = res;
      });
  }

  viewEmployee(id: number) {
    this.empId = id;
    this.router.navigate(['viewemployee/' + id]);
  }

  deleteEmployee(id:number){
    this.empId = id;
    this.router.navigate(['deleteemployee/' + id]);
  }
}
