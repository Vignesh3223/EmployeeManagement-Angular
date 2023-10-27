import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';
import { Employee } from 'src/models/employee';
import { MessageService } from 'primeng/api';
import { Route, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-updatestatus',
  templateUrl: './updatestatus.component.html',
  styleUrls: ['./updatestatus.component.css']
})
export class UpdatestatusComponent implements OnInit {

  employeeData: Employee | any;
  // currentstatus: string | any;

  constructor(private employeeService: EmployeeService,
    private messageService: MessageService, private route: Router) { }

  ngOnInit(): void {
    const loggedUser = this.employeeService.getLoggedInUserId();
    this.employeeService.getEmployeeById(loggedUser).subscribe(
      (res) => {
        this.employeeData = res;
      });
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Status Updated Successfully' });
  }

  updateStatus(id: number, status: any) {
    setTimeout(() => {
      status.pipe(map((stat: any) => stat.find((s: any) => s.id === id))).next(status)
    }, 1000);
    //setTimeout(() => { this.employeeService.status.next(status) }, 1000);
    //this.employeeService.status.next(status);
    this.employeeService.updateStatus(id, status);
    this.showSuccess();
    this.route.navigate(['/']);
  }
}
