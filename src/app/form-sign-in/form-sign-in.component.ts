import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

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
      this.router.navigateByUrl('/');
    }
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // Vérifier si la réponse contient un message SUCCESS
        if (response && response.message === "SUCCESS") {
          // Gérer la connexion réussie ici
          console.log("Connexion réussie");
          this.router.navigateByUrl('/home');
          // Rediriger l'utilisateur, afficher un message de succès, etc.
        } else {
          console.error("Réponse de connexion invalide :", response);
          // Afficher un message d'erreur générique ou effectuer une autre action en cas de réponse invalide
        }
      },
      (error) => {
        console.error("Erreur lors de la connexion :", error);
        // Gérer les erreurs de la requête HTTP ici
        // Afficher un message d'erreur à l'utilisateur, nettoyer les champs de formulaire, etc.
      }
    );
  }
  
}
