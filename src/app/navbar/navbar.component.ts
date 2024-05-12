import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as constantNav from '../const/nav';
import { MenuNavigationComponent } from '../login-navigation/login-navigation.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MenuNavigationComponent, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  utilisateurAdmin: Boolean = false;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.isAdmin()
  }

  newTicket(): void {
    // Code pour gérer la déconnexion de l'utilisateur

    // Redirection vers "/logout"
    this.router.navigate([constantNav.createTicket]);
  }

  viewTickets(): void {
    this.router.navigate([constantNav.viewTickets]);
  }

  viewTicketsUsers(): void {
    this.router.navigate([constantNav.viewTicketsUsers]);
  }

  viewMyTickets(): void {
    this.router.navigate([constantNav.viewMyTickets]);

  }

  isAdmin(): void {
    const is_admin = this.authService.getAdminPerm()
    console.log(is_admin)
    if (is_admin == "true") {
      this.utilisateurAdmin = true
    } else {
      this.utilisateurAdmin = false
    }
    console.log(this.utilisateurAdmin)

  }

  estAdmin(): Boolean {
    return this.utilisateurAdmin;
  }
}
