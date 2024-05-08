import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarNavigationComponent } from '../sidebar-navigation/sidebar-navigation.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as constantNav from '../const/nav';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,SidebarNavigationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private authService: AuthService, private router: Router) { 
  }
  ngOnInit(): void {
    // Vérifier si l'utilisateur est déjà connecté lors de l'initialisation du composant
    if (!this.authService.getToken()) {
      this.router.navigateByUrl(constantNav.login);
    }
  }
}
