import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as constantNav from '../const/nav';
import * as constantService from '../const/service';

@Component({
  selector: 'app-form-sign-in',
  standalone: true,
  imports: [MatCardModule, FormsModule, HttpClientModule],
  templateUrl: './form-sign-in.component.html',
  styleUrl: './form-sign-in.component.scss'
})
export class FormSignInComponent {
  email: string = "";
  password: string = "";
  utilisateurAdmin: Boolean = false;
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.router.navigateByUrl(constantNav.root);
    }
    this.isAdmin();
  }

  isAdmin(): void {
    this.authService.isAdmin(this.authService.getIdToken()).subscribe(
      (response) => {
        if (response.message == true) {
          this.utilisateurAdmin = true;
        } else {
          this.utilisateurAdmin = false;
        }
      },
      (error) => {
        console.error("Erreur :", error);
      }
    );
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // Vérifier si la réponse contient un message SUCCESS
        if (response && response.message === constantService.success) {
          if (this.utilisateurAdmin) {
            localStorage.setItem("is_admin", "true");
            this.router.navigateByUrl(constantNav.viewTickets);
          } else {
            localStorage.setItem("is_admin", "false");
            this.router.navigateByUrl(constantNav.viewTicketsUsers);
          }
        } else {
          console.error("Réponse de connexion invalide :", response);
        }
      },
      (error) => {
        console.error("Erreur lors de la connexion :", error);
      }
    );
  }

  onRegister(){
    this.router.navigateByUrl(constantNav.register);
  }

}
