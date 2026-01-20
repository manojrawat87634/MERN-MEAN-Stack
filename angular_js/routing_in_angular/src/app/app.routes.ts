import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';

export const routes: Routes = [
    {component : Home, path : ""},
    {component : About, path : "about"},
    {component : Contact, path : "contact"}
];
