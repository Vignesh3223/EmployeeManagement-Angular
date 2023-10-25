import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Department } from 'src/models/department';
import { DepartmentService } from 'src/services/department.service';
import { DesignationService } from 'src/services/designation.service';
import { Designation } from 'src/models/designation';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {

  hide = true;

  departments: Department | any;
  designation: Designation | any;
  selectedDepartment: Department | null = null;
  selectedDesignation: Designation | null = null;

  NewEmployeeForm: FormGroup | any;
  firstName: FormControl | any;
  lastName: FormControl | any;
  dateOfBirth: FormControl | any;
  email: FormControl | any;
  username: FormControl | any;
  password: FormControl | any;
  mobileNumber: FormControl | any;
  addressLine1: FormControl | any;
  addressLine2: FormControl | any;
  city: FormControl | any;
  state: FormControl | any;
  zipCode: FormControl | any;
  hireDate: FormControl | any;
  departmentId: FormControl | any;
  designationId: FormControl | any;

  submitted = false;

  constructor(private employeeService: EmployeeService,
    private router: Router,
    private messageService: MessageService,
    private departmentService: DepartmentService,
    private designationService: DesignationService) { }

  ngOnInit(): void {
    this.firstName = new FormControl('',
      [
        Validators.required,
        Validators.pattern('[A-Za-z ]*')
      ]);
    this.lastName = new FormControl('',
      [
        Validators.required,
        Validators.pattern('[A-Za-z ]*')
      ]);
    this.dateOfBirth = new FormControl('', [Validators.required]);
    this.email = new FormControl('',
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]);
    this.username = new FormControl('',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[A-Za-z ]*')
      ]);
    this.password = new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]){8,16}/)
      ]);
    this.mobileNumber = new FormControl('',
      [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('[0-9]*')
      ]);
    this.addressLine1 = new FormControl('', [Validators.required]);
    this.addressLine2 = new FormControl('', [Validators.required]);
    this.city = new FormControl('',
      [
        Validators.required,
        Validators.pattern('[A-Za-z ]*')
      ]);
    this.state = new FormControl('', [Validators.required]);
    this.zipCode = new FormControl('',
      [
        Validators.required,
        Validators.maxLength(6),
        Validators.pattern('[0-9]*')
      ]);
    this.hireDate = new FormControl('', [Validators.required]);
    this.departmentId = new FormControl('', [Validators.required]);
    this.designationId = new FormControl('', [Validators.required]);

    this.NewEmployeeForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      email: this.email,
      username: this.username,
      password: this.password,
      mobileNumber: this.mobileNumber,
      addressLine1: this.addressLine1,
      addressLine2: this.addressLine2,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode,
      hireDate: this.hireDate,
      departmentId: this.departmentId,
      designationId: this.designationId
    });

    this.departmentService.getDepartment().subscribe(
      (res) => {
        this.departments = res;
      });

    this.designationService.getDesignation().subscribe(
      (res) => {
        this.designation = res;
      });
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee Added Successfully' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all the details' });
  }

  onPost() {
    this.submitted = true;
    if (this.NewEmployeeForm.invalid) {
      this.showError();
    }
    else {
      this.employeeService.postEmployee(this.NewEmployeeForm.value).subscribe({
        next: (res) => {
          this.showSuccess();
          setTimeout(() => { this.router.navigate(['/allemployees']) }, 500);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
