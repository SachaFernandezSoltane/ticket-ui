import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-form-create-ticket',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,NavbarComponent],
  templateUrl: './form-create-ticket.component.html',
  styleUrl: './form-create-ticket.component.scss'
})
export class FormCreateTicketComponent {
}
