import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { Employee } from '../../core/model/employee.model';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employees.html'
})
export class EmployeeComponent implements OnInit {

  // ✅ Signals
  employees = signal<Employee[]>([]);
  loading = signal(false);
  editingId = signal<number | null>(null);

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      doj: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(18)]]
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  // ✅ Load Employees
  loadEmployees() {
    this.loading.set(true);

    this.employeeService.getAll().subscribe({
      next: (data) => {
        this.employees.set(data);   // no need for spread
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  // ✅ Submit
  submit() {
    if (this.form.invalid) return;

    const employee = this.form.value as Employee;

    const id = this.editingId(); // 🔥 read signal properly

    if (id !== null) {
      this.employeeService.update(id, employee)
        .subscribe(() => this.afterSave());
    } else {
      this.employeeService.create(employee)
        .subscribe(() => this.afterSave());
    }
  }

  // ✅ Edit
  edit(emp: Employee) {
    this.editingId.set(emp.id!); // 🔥 set signal correctly
    this.form.patchValue(emp);
  }

  // ✅ Delete (Optimistic Update — better UX)
  delete(id: number) {
    this.employeeService.delete(id)
      .subscribe(() => {
        this.employees.update(list =>
          list.filter(emp => emp.id !== id)
        );
      });
  }

  // ✅ After Save
  afterSave() {
    this.form.reset();
    this.editingId.set(null); // 🔥 reset properly
    this.loadEmployees();
  }
}