import { Routes } from '@angular/router';
import { Contact } from '../pages/contact/contact';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';

export const routes: Routes = [
    { component : Contact, path : "contact" },
    { component : Home, path : "" },
    { component : Login, path : "login" },
    { component : Login, path : "user/:id" },
];
