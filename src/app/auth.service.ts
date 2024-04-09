import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8090/user/login';
  private jwtToken: string|null = "";

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        console.log("là");
        console.log(response);
        console.log(response.token);
        if (response && response.token) {
          // Enregistrement du jeton JWT dans le stockage local
          this.jwtToken = response.token;
          if(this.jwtToken){
            localStorage.setItem('jwtToken', this.jwtToken);
          }
        }
      })
    );
  }

  getToken(): string|null {
    // Récupération du jeton JWT depuis le stockage local
    console.log(this.jwtToken);
    console.log(localStorage.getItem('jwtToken'));
    return this.jwtToken || localStorage.getItem('jwtToken');
  }

  logout(): void {
    // Suppression du jeton JWT du stockage local lors de la déconnexion
    console.log("rhoha")
    console.log(this.jwtToken);
    console.log(localStorage.getItem('jwtToken'));
    this.jwtToken = null;
    localStorage.removeItem('jwtToken');
  }
}
