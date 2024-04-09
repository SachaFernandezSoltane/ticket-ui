import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    console.log(email);
    console.log(password);
    // Définissez les en-têtes HTTP avec l'origine de votre application Angular


    // Utilisez les en-têtes définis dans la demande HTTP
    return this.http.post<any>('http://localhost:8090/user/login', { email, password });
  }
}
