import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './models/employee';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public employees: Employee[] = [];
  public editEmployee?: Employee;
  public deleteEmployee?: Employee;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.employeeService.getAllEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.employeeService.getAllEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(employeeId?: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.employeeService.getAllEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    // checks if word in search matches name, email, etc
    for (const employee of this.employees) {
      if (
        employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(employee);
      }
    }

    this.employees = results;

    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  public onOpenModal(employee?: Employee, mode?: String): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    // changes button type from 'submit' to 'button'
    button.type = 'button';
    // hides the button
    button.style.display = 'none';
    // adds the attribute data toggle with value modal
    button.setAttribute('data-bs-toggle', 'modal');
    // if the mode is add, create attribute data-target with id of modal to open
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addEmployeeModal');
    }

    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-bs-target', '#updateEmployeeModal');
    }

    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-bs-target', '#deleteEmployeeModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
