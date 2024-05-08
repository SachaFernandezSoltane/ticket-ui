import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import * as constantNav from '../const/nav';
import * as constantService from '../const/service';

@Component({
  selector: 'app-form-sign-in',
  standalone: true,
  imports: [MatCardModule,FormsModule,HttpClientModule],
  templateUrl: './form-sign-in.component.html',
  styleUrl: './form-sign-in.component.scss'
})
export class FormSignInComponent {
  email: string = "";
  password: string = "" ;

  constructor(private http: HttpClient,private authService: AuthService, private router: Router) { 
  }

  ngOnInit(): void {
    // Vérifier si l'utilisateur est déjà connecté lors de l'initialisation du composant
    if (this.authService.getToken()) {
      // Rediriger l'utilisateur vers la page principale
      this.router.navigateByUrl(constantNav.root);
    }
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log(response)
        // Vérifier si la réponse contient un message SUCCESS
        if (response && response.message === constantService.success) {
          this.router.navigateByUrl(constantNav.home);
        } else {
          console.error("Réponse de connexion invalide :", response);
        }
      },
      (error) => {
        console.error("Erreur lors de la connexion :", error);
      }
    );
  }
  
}
