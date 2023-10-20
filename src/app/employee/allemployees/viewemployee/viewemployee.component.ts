import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/models/employee';
import { DepartmentService } from 'src/services/department.service';
import { DesignationService } from 'src/services/designation.service';
import { EmployeeService } from 'src/services/employee.service';
import { SalaryService } from 'src/services/salary.service';

@Component({
  selector: 'app-viewemployee',
  templateUrl: './viewemployee.component.html',
  styleUrls: ['./viewemployee.component.css']
})
export class ViewemployeeComponent implements OnInit {

  empId: number | any;
  empdata: Employee | any;

  constructor(
    private employeeservice: EmployeeService,
    private departmentService: DepartmentService,
    private designationService: DesignationService,
    private salaryService: SalaryService,
    private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.empId = this.actRoute.snapshot.params['id'];

    this.departmentService.getDepartment().subscribe((departments) => {
      const deptlist = departments;
      this.designationService.getDesignation().subscribe((designation) => {
        const desiglist = designation;
        this.salaryService.getSalary().subscribe((salary) => {
          const salarylist = salary;
          this.employeeservice.getEmployeeById(parseInt(this.empId)).subscribe((employee) => {
            this.empdata = Array.isArray(employee) ? employee : [employee];
            this.empdata.forEach((emp: any) => {
              const matchingdept = deptlist.find((department) => department.id === emp.departmentId);
              const matchingdesig = desiglist.find((desig) => desig.id === emp.designationId);
              const matchingsalary = salarylist.find(
                (sal) => sal.departmentId === emp.departmentId && sal.designationId === emp.designationId);
              if (matchingdept && matchingdesig && matchingsalary) {
                emp.departmentname = matchingdept.departmentname;
                emp.designationName = matchingdesig.designationName;
                emp.basicSalary = matchingsalary.basicSalary;
                emp.bonus = matchingsalary.bonus;
                emp.benefits = matchingsalary.benefits;
                emp.otherAllowance = matchingsalary.otherAllowance;
              }
            });
            console.log(this.empdata);
          });
        });
      });
    });

  }
}
