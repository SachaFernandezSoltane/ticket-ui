import { Routes } from '@angular/router';
import { FormSignInComponent } from './form-sign-in/form-sign-in.component';
import { LogoutComponent } from './logout/logout.component';
import { FormCreateTicketComponent } from './form-create-ticket/form-create-ticket.component';
import { ViewTicketsComponent } from './view-tickets/view-tickets.component';
import { DetailsTicketComponent } from './details-ticket/details-ticket.component';
import { ViewTicketUsersComponent } from './view-ticket-users/view-ticket-users.component';
import { ViewMyTicketsComponent } from './view-my-tickets/view-my-tickets.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: 'login', component: FormSignInComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'create-ticket', component: FormCreateTicketComponent},
  { path: 'view-tickets', component: ViewTicketsComponent},
  { path: 'view-tickets-users', component: ViewTicketUsersComponent},
  { path: 'view-my-tickets', component: ViewMyTicketsComponent},
  { path: 'details-ticket/:idTicket', component: DetailsTicketComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo: '/view-tickets', pathMatch: 'full' },
];
