import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserData } from './interfaces/user';
import * as constants from './const/service';
import * as constantsNav from './const/nav';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8090/user';
  private jwtToken: string|null = "";

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl+ constantsNav.login, { email, password }).pipe(
      tap(response => {
        if (response && response.token) {
          // Enregistrement du jeton JWT dans le stockage local
          this.jwtToken = response.token;
          if(this.jwtToken){
            localStorage.setItem(constants.jwtToken, this.jwtToken);
          }
        }
      })
    );
  }

  getAllUsers(){
    return this.http.get<UserData[]>(this.apiUrl+constants.all)
  }

  getToken(): string|null {
    return this.jwtToken || localStorage.getItem(constants.jwtToken);
  }

  logout(): void {
    this.jwtToken = null;
    localStorage.removeItem(constants.jwtToken);
  }
}
