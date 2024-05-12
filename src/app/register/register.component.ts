import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as constantNav from '../const/nav';
import * as constantService from '../const/service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email: string = "";
  password: string = "";
  username: string = "";

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
    this.authService.register(this.email, this.password,this.username).subscribe(
      (response) => {
        // Vérifier si la réponse contient un message SUCCESS
        this.router.navigateByUrl(constantNav.login);
      },
      (error) => {
        console.error("Erreur lors de la connexion :", error);
      }
    );
  }

  onLogin(){
    this.router.navigateByUrl(constantNav.login);
  }
}
