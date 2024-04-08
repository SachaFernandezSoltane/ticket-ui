import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    // Définissez les en-têtes HTTP avec l'origine de votre application Angular
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200/login' // Remplacez localhost:4200 par l'URL de votre application Angular
      })
    };

    // Utilisez les en-têtes définis dans la demande HTTP
    return this.http.post<any>('http://localhost:8090/api/user/login', { email, password }, httpOptions);
  }
}
