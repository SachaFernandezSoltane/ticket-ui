import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as constantNav from '../const/nav';
import { login } from '../const/nav';
import { NavbarComponent } from '../navbar/navbar.component';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-view-my-tickets',
  standalone: true,
  imports: [NavbarComponent, MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule, NgFor],
  templateUrl: './view-my-tickets.component.html',
  styleUrl: './view-my-tickets.component.scss'
})
export class ViewMyTicketsComponent {
  tickets: any[] = [];
  utilisateurAdmin: boolean = false;

  constructor(private ticketService: TicketService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (!this.authService.getToken()) {
      // Rediriger l'utilisateur vers la page principale
      this.router.navigateByUrl(login);
    }
    this.fillData();

    this.isAdmin();
    if (this.utilisateurAdmin) {
      this.router.navigate([constantNav.viewTickets]);
    }
  }

  isAdmin(): void {
    const is_admin = this.authService.getAdminPerm()
    if (is_admin == "true") {
      this.utilisateurAdmin = true
    } else {
      this.utilisateurAdmin = false
    }

  }

  fillData(): void {
    this.ticketService.getAllTickets().subscribe((tickets: any[]) => {
      tickets.forEach((element: any) => {
        const newT: any = {
          idTicket: undefined,
          titreTicket: "Titre du ticket",
          userTicket: undefined,
          userId: undefined,
          statusTicket: undefined,
          descriptionTicket: "Description du ticket"
        };

        if (element['status']) {
          newT.statusTicket = element['status']['userStatus']
        }
        newT.idTicket = element['id']
        newT.descriptionTicket = element['description']
        newT.titreTicket = element['name']
        newT.userTicket = element['user']['username']
        newT.userId = element['user']['id']

        if (newT.userId == this.authService.getIdToken()) {
          this.tickets.push(newT);
        }
      });
    }, (error: any) => {
      console.error("Error fetching tickets:", error);
    });
  }
}
