import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as constantNav from '../const/nav';
import { root } from '../const/nav';
import { StatusData } from '../interfaces/status';
import { UserData } from '../interfaces/user';
import { NavbarComponent } from '../navbar/navbar.component';
import { StatusService } from '../status.service';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-details-ticket',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, NavbarComponent, NgFor, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './details-ticket.component.html',
  styleUrl: './details-ticket.component.scss'
})
export class DetailsTicketComponent {
  statusList: StatusData[] = [];
  usersList: UserData[] = [];

  titreTicket: string = '';
  userTicket: number = 0;
  typeTicket: string = '';
  statusTicket: number = 0;
  descriptionTicket: string = '';
  ticketId: string | null = '';

  constructor(private route: ActivatedRoute, private ticketService: TicketService, private statusService: StatusService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.getToken()) {
      // Rediriger l'utilisateur vers la page principale
      this.router.navigateByUrl(root);
    }
    // Récupère l'ID du ticket de l'URL
    this.ticketId = this.route.snapshot.paramMap.get('idTicket');

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

    this.ticketService.getOneTicket(this.ticketId).subscribe(
      (response) => {
        this.titreTicket = response['name']
        this.userTicket = response['user']['id']
        this.typeTicket = "Ticket"
        this.statusTicket = response['status']['id']
        this.descriptionTicket = response['description']
      },
      (error) => {
        console.error("Erreur :", error);
      }
    );
  }

  updateTicket(): void {
    const newTicket: any = {
      "idTicket": this.ticketId,
      "titreTicket": this.titreTicket,
      "userTicket": this.userTicket.toString(),
      "statusTicket": this.statusTicket.toString(),
      "descriptionTicket": this.descriptionTicket
    }
    this.ticketService.updateTicket(newTicket).subscribe(
      (response) => {
        const url: any[] = [constantNav.detailsTickets];
        this.router.navigate([constantNav.viewTickets]);

      },
      (error) => {
        console.error("Erreur :", error);
      }
    );
  }

}
