import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeStoreService {

  private fullname$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  constructor() { }

  public getRoleFromStore() {
    return this.role$.asObservable();
  }
  
  public setRoleForStore(role: string) {
    this.role$.next(role);
  }

  public getFullName() {
    return this.fullname$.asObservable();
  }

  public setFullname(name: string) {
    this.fullname$.next(name);
  }

}
