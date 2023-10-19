import { Component,OnInit } from '@angular/core';
import { Employee } from 'src/models/employee';
import { EmployeeService } from 'src/services/employee.service';

@Component({
  selector: 'app-allemployees',
  templateUrl: './allemployees.component.html',
  styleUrls: ['./allemployees.component.css']
})
export class AllemployeesComponent implements OnInit {

  employeedata: Employee | any;

  constructor(private employeeservice: EmployeeService) { }

  ngOnInit(): void {
    this.employeeservice.getEmployees().subscribe(
      (res) => {
        this.employeedata = res;
        console.log(this.employeedata);
      });
  }
}
