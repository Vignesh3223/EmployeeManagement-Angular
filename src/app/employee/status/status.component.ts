import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/models/employee';
import { EmployeeService } from 'src/services/employee.service';
import { Designation } from 'src/models/designation';
import { DesignationService } from 'src/services/designation.service';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  statusData: Employee | any;
  activestatus: string | any;

  constructor(private employeeService: EmployeeService, private desigService: DesignationService) { }
  ngOnInit(): void {
    this.employeeService.status.subscribe(
      (res) => {
        this.activestatus = res;
        console.log(this.activestatus);
      });

    this.desigService.getDesignation().subscribe(
      (desig) => {
        const designation = desig;
        this.employeeService.getEmployees().subscribe
          ((res) => {
            this.statusData = Array.isArray(res) ? res : [res];
            this.statusData.forEach((emp: any) => {
              const matchingdesig = designation.find((design) => design.id === emp.designationId);
              if (matchingdesig) {
                emp.designationName = matchingdesig.designationName
              }
            });
          });
      });
  }
}
