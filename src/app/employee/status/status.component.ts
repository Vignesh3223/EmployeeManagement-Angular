import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/models/employee';
import { EmployeeService } from 'src/services/employee.service';
import { DesignationService } from 'src/services/designation.service';
import { map, take, timer } from 'rxjs';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})

export class StatusComponent implements OnInit {

  statusData: Employee | any;
  employee: Employee | any;
  activestatus: string | any;

  constructor(private employeeService: EmployeeService,
    private desigService: DesignationService) { }

  ngOnInit(): void {
    this.employeeService.activity.subscribe(
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

  updateStatus(id: number, newstatus: any) {
    timer(2000).pipe(take(1)).subscribe(() => {
    this.employeeService.getEmployees().subscribe(
      (res) => {
        for (var i = 0; i < res.length; i++) {
          if (res[i].id === id) {
            this.employeeService.status.next(newstatus);
            console.log(`Status updated for user with id ${id}`);
            break;
          }
        }
      });
    });
    // timer(2000).pipe(take(1)).subscribe(() => {
    //   this.employeeService.getEmployeeById(id).subscribe(
    //     (employee) => {
    //       if (employee) {
    //         this.employeeService.status.next(newstatus);
    //         console.log(`Status updated for user with id ${id}`);
    //       } else {
    //         console.log(`No user found with id ${id}`);
    //       }
    //     });
    // });

    timer(4000).pipe(take(1)).subscribe(() => {
      this.employeeService.updateStatus(id, newstatus);
    });
  }
}
