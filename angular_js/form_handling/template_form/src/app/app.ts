import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isLogin = false;

  users : string[]= ["abc", "manoj", "akshay kumar"];
  login(){
    this.isLogin = true;
  }
  logout(){
    this.isLogin = false;
  }
}
