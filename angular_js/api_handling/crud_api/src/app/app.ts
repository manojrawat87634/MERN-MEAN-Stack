import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeComponent } from "../pages/employees/employees";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmployeeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('crud_api');
}
