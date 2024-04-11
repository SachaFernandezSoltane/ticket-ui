import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import * as constantNav from '../const/nav';

@Component({
  selector: 'app-menu-navigation',
  templateUrl: './login-navigation.component.html',
  standalone : true,
  imports : [MatMenuModule,MatButtonModule,NgIf],
  styleUrls: ['./login-navigation.component.scss']
})
export class MenuNavigationComponent {

  utilisateurConnecte: boolean = false; 

  constructor(private authService: AuthService, private router: Router) { 
  }

  estConnecte(): boolean {
    return !!this.authService.getToken(); 
  }
  

  deconnexion(): void {
    this.router.navigate([constantNav.logout]);
  }
}
