import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.urlAPI}/all`);
  }

  public getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${environment.urlAPI}/find/${employeeId}`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${environment.urlAPI}/add`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${environment.urlAPI}/update`, employee);
  }

  public deleteEmployee(employeeId?: number): Observable<void> {
    return this.http.delete<void>(`${environment.urlAPI}/delete/${employeeId}`);
  }
}
