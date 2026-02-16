import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  user = {
    name: '',
    email: ''
  };
   submitForm(form: NgForm) {
    console.log(form.value);
    console.log(form.resetForm());  
  }
}
