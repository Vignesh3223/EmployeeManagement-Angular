import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (EmployeeService.isLoggedIn()) {
    return true
  }
  else {
   router.navigate(['/']);
  }
  return false;
};