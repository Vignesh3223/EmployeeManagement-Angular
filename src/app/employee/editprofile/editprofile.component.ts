import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Employee } from 'src/models/employee';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  hide = true;

  userdata: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    email: '',
    username: '',
    password: '',
    mobileNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    hireDate: new Date,
    isActive: false,
    departmentId: 0,
    designationId: 0,
    createdDate: new Date
  }

  EditForm: FormGroup | any;
  id: FormControl | any;
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
  isActive: FormControl | any;
  departmentId: FormControl | any;
  designationId: FormControl | any;
  createdDate: FormControl | any;

  submitted = false;

  constructor(private employeeService: EmployeeService,
    private router: Router,
    private messageService: MessageService,
    private datePipe:DatePipe) { }

  ngOnInit(): void {
    const loggedUser = this.employeeService.getLoggedInUserId();
    this.employeeService.getEmployeeById(loggedUser).subscribe(
      (res) => {
        this.userdata = res;
        this.setFormValues();
      });

    this.id = new FormControl('');
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
    this.isActive = new FormControl('', [Validators.required]);
    this.departmentId = new FormControl('', [Validators.required]);
    this.designationId = new FormControl('', [Validators.required]);
    this.createdDate = new FormControl('');

    this.EditForm = new FormGroup({
      id: this.id,
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
      isActive: this.isActive,
      departmentId: this.departmentId,
      designationId: this.designationId,
      createdDate: this.createdDate
    });
  }

  setFormValues(): void {
    this.EditForm.patchValue({
      id: this.userdata.id,
      firstName: this.userdata.firstName,
      lastName: this.userdata.lastName,
      dateOfBirth: this.userdata.dateOfBirth,
      email: this.userdata.email,
      username: this.userdata.username,
      password: this.userdata.password,
      mobileNumber: this.userdata.mobileNumber,
      addressLine1: this.userdata.addressLine1,
      addressLine2: this.userdata.addressLine2,
      city: this.userdata.city,
      state: this.userdata.state,
      zipCode: this.userdata.zipCode,
      hireDate: this.userdata.hireDate,
      isActive: this.userdata.isActive,
      departmentId: this.userdata.departmentId,
      designationId: this.userdata.designationId,
      createdDate: this.userdata.createdDate
    });
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile Updated Successfully' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all the details' });
  }

  onEdit(id: number, someform: any) {
    var formattedDate = this.datePipe.transform(this.EditForm.value.dateOfBirth, 'yyyy-MM-dd');
    this.EditForm.patchValue({dateOfBirth: formattedDate});
    this.submitted = true;
    if (this.EditForm.invalid) {
      this.showError();
    }
    else {
      this.employeeService.editEmployee(id, this.EditForm.value).subscribe({
        next: (res) => {
          this.showSuccess();
          setTimeout(() => { this.router.navigate(['/']) }, 1000);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
