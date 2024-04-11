import { Routes } from '@angular/router';
import { FormSignInComponent } from './form-sign-in/form-sign-in.component';
import { LogoutComponent } from './logout/logout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FormCreateTicketComponent } from './form-create-ticket/form-create-ticket.component';

export const routes: Routes = [
  { path: 'login', component: FormSignInComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'home', component: HomeComponent},
  { path: 'create-ticket', component: FormCreateTicketComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
