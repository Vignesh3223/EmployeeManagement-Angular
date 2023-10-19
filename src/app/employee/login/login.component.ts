import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/models/employee';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  LoginForm: FormGroup | any;
  username: FormControl | any;
  password: FormControl | any;

  submitted = false;

  constructor(private employeeService: EmployeeService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.username = new FormControl('',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[A-Za-z ]*')
      ]);
    this.password = new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/)
      ]);

    this.LoginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Success' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all the details' });
  }

  onLogin(employee: Employee) {
    if (this.LoginForm.invalid) {
      this.showError();
    }
    else {
      this.employeeService.validateUser(employee);
      this.showSuccess();
      setTimeout(() => { this.router.navigate(['/home']) }, 1000);
    }
  }
}
