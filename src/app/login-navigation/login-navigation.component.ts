import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-menu-navigation',
  templateUrl: './login-navigation.component.html',
  standalone : true,
  imports : [MatMenuModule,MatButtonModule,NgIf],
  styleUrls: ['./login-navigation.component.scss']
})
export class MenuNavigationComponent {

  constructor(private authService: AuthService, private router: Router) { 
  }

  
  utilisateurConnecte: boolean = false; // Assurez-vous d'initialiser cette variable selon l'état de connexion de l'utilisateur

  estConnecte(): boolean {
    if(this.authService.getToken()){
      return true;
    }else{
      return false;
    }
  }

  deconnexion(): void {
    // Code pour gérer la déconnexion de l'utilisateur

    // Redirection vers "/logout"
    this.router.navigate(['/logout']);
  }
}
