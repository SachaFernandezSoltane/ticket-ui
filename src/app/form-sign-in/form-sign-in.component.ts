import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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

  constructor(private http: HttpClient,private authService: AuthService) { 
    console.log('on arrive ici');
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        // Gérer la réponse de l'API (par exemple, stocker le token d'authentification)
      },
      error => {
        // Gérer les erreurs de connexion
      }
    );
  }
}
