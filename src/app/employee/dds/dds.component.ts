import { Component,OnInit } from '@angular/core';
import { Department } from 'src/models/department';
import { Designation } from 'src/models/designation';
import { Salary } from 'src/models/salary';
import { DepartmentService } from 'src/services/department.service';
import { DesignationService } from 'src/services/designation.service';
import { SalaryService } from 'src/services/salary.service';

@Component({
  selector: 'app-dds',
  templateUrl: './dds.component.html',
  styleUrls: ['./dds.component.css']
})
export class DdsComponent implements OnInit{

  departments:Department|any;
  designation:Designation|any;
  salary:Salary|any;

  constructor(private departmentService:DepartmentService,
   private designationService:DesignationService,
   private salaryService:SalaryService ){}

  ngOnInit(): void {
    this.departmentService.getDepartment().subscribe(
      (res)=>{
        this.departments = res;
      });
    
      this.designationService.getDesignation().subscribe(
        (res)=>{
          this.designation = res;
        });

        this.salaryService.getSalary().subscribe(
          (res)=>{
            this.salary = res;
          });
  }
}
