import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Designation } from 'src/models/designation';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  designationapi = environment.designationurl;

  constructor(private http: HttpClient) { }

  getDesignation() {
    return this.http.get<Designation[]>(this.designationapi + '/' + 'GetDesignation');
  }
}
