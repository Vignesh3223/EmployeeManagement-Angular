import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/models/employee';
import { EmployeeService } from 'src/services/employee.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deleteemployee',
  templateUrl: './deleteemployee.component.html',
  styleUrls: ['./deleteemployee.component.css']
})
export class DeleteemployeeComponent implements OnInit {

  empId!: number;

  userdata: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    dateOfBirth: new Date,
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

  DeleteForm: FormGroup | any;
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
    private messageService: MessageService,
    private router: Router,
    private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.empId = this.actRoute.snapshot.params['id'];

    this.employeeService.getEmployeeById(this.empId).subscribe(
      (res) => {
        this.userdata = res;
        this.setFormValues();
      });

    this.id = new FormControl('');
    this.firstName = new FormControl('');
    this.lastName = new FormControl('');
    this.dateOfBirth = new FormControl('');
    this.email = new FormControl('');
    this.username = new FormControl('');
    this.password = new FormControl('');
    this.mobileNumber = new FormControl('');
    this.addressLine1 = new FormControl('');
    this.addressLine2 = new FormControl('');
    this.city = new FormControl('');
    this.state = new FormControl('');
    this.zipCode = new FormControl('');
    this.hireDate = new FormControl('');
    this.isActive = new FormControl('');
    this.departmentId = new FormControl('');
    this.designationId = new FormControl('');
    this.createdDate = new FormControl('');

    this.DeleteForm = new FormGroup({
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
    this.DeleteForm.patchValue({
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
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record Deleted Successfully' });
  }

  onDelete(id: number) {
    this.employeeService.deleteEmployee(id, this.DeleteForm.value).subscribe(
      (res) => {
        this.showSuccess();
        setTimeout(() => { this.router.navigate(['/allemployees']) }, 500);
      });
  }
}
