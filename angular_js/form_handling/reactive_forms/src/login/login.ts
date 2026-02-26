import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form!: FormGroup;
  loading = signal(false);
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email]
    });
  }

  onSubmit() {
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
    }, 2000);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }
}
