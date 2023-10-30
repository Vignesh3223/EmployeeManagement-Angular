import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AllemployeesComponent } from './allemployees/allemployees.component';
import { DdsComponent } from './dds/dds.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { ViewemployeeComponent } from './allemployees/viewemployee/viewemployee.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { DeleteemployeeComponent } from './allemployees/deleteemployee/deleteemployee.component';
import { StatusComponent } from './status/status.component';
import { authGuard } from 'src/guard/auth.guard';

const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "allemployees", component: AllemployeesComponent, canActivate: [authGuard]
  },
  {
    path: "dds", component: DdsComponent, canActivate: [authGuard]
  },
  {
    path: "addemployee", component: AddemployeeComponent, canActivate: [authGuard]
  },
  {
    path: "viewemployee/:id", component: ViewemployeeComponent, canActivate: [authGuard]
  },
  {
    path: "editprofile", component: EditprofileComponent, canActivate: [authGuard]
  },
  {
    path: "deleteemployee/:id", component: DeleteemployeeComponent, canActivate: [authGuard]
  },
  {
    path: "statuslist", component: StatusComponent, canActivate: [authGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
