import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AllemployeesComponent } from './allemployees/allemployees.component';
import { DdsComponent } from './dds/dds.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { ViewemployeeComponent } from './allemployees/viewemployee/viewemployee.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { DeleteemployeeComponent } from './allemployees/deleteemployee/deleteemployee.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    AllemployeesComponent,
    DdsComponent,
    AddemployeeComponent,
    ViewemployeeComponent,
    EditprofileComponent,
    DeleteemployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    ToastModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule
  ],
  providers:[DatePipe]
})
export class EmployeeModule { }
