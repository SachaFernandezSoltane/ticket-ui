import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { StatusService } from '../status.service';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { AuthService } from '../auth.service';
import { UserData } from '../interfaces/user';
import { StatusData } from '../interfaces/status';
import { Router } from '@angular/router';
import { root } from '../const/nav';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { TicketService } from '../ticket.service';
import { TicketData } from '../interfaces/ticket';
import * as constantes from '../const/object';

@Component({
  selector: 'app-form-create-ticket',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,NavbarComponent,NgFor,MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './form-create-ticket.component.html',
  styleUrl: './form-create-ticket.component.scss'
})
export class FormCreateTicketComponent {
  statusList: StatusData[] = []; 
  usersList: UserData[] = [];

  titreTicket: string = ''; 
  userTicket: number = 0; 
  typeTicket: string = ''; 
  statusTicket:number = 0;
  descriptionTicket:string = '';

  constructor(private http: HttpClient,private statusService: StatusService,private authService:AuthService,private router:Router,private ticketService:TicketService ) { 
  }
  
  ngOnInit(){

    if (!this.authService.getToken()) {
      // Rediriger l'utilisateur vers la page principale
      this.router.navigateByUrl(root);
    }
    this.statusService.getAllStatus().subscribe(
      (response) => {
        this.statusList = response; 
      },
      (error) => {
        console.error("Erreur :", error);
      }
    );
    
    this.authService.getAllUsers().subscribe(
      (response) => {
        this.usersList = response; 
      },
      (error) => {
        console.error("Erreur :", error);
      }
    );
  }

  submit(): void{
    const newTicket: TicketData = {
      [constantes.TICKET_TITRE]: this.titreTicket,
      [constantes.TICKET_USER]: this.userTicket,
      [constantes.TICKET_TYPE]: this.typeTicket,
      [constantes.TICKET_STATUS]: this.statusTicket,
      [constantes.TICKET_DESCRIPTION]: this.descriptionTicket
    };
    this.ticketService.createTicket(newTicket).subscribe(
      (response) => {
        console.error("Response :", response);
      },
      (error) => {
        console.error("Erreur :", error);
      }
    );
  }
}
