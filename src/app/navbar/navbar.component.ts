import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MenuNavigationComponent } from '../login-navigation/login-navigation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule,MenuNavigationComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router: Router){}

  newTicket(): void {
    // Code pour gérer la déconnexion de l'utilisateur

    // Redirection vers "/logout"
    this.router.navigate(['/create-ticket']);
  }

  home(): void {
    // Code pour gérer la déconnexion de l'utilisateur

    // Redirection vers "/logout"
    this.router.navigate(['/home']);
  }
}
