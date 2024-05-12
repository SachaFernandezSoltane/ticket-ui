import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserData } from './interfaces/user';
import * as constants from './const/service';
import * as constantsNav from './const/nav';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8090/user';
  private apiUrlRole = 'http://localhost:8090/role';

  private jwtToken: string|null = "";
  private userId: string = ""
  constructor(private http: HttpClient,private router:Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl+ constantsNav.login, { email, password }).pipe(
      tap(response => {
        if (response && response.token) {
          // Enregistrement du jeton JWT dans le stockage local
          this.jwtToken = response.token;
          this.userId = response.user_id
          if(this.jwtToken){
            localStorage.setItem(constants.jwtToken, this.jwtToken);
            localStorage.setItem(constants.idToken, this.userId);
          }
        }
      })
    );
  }

  register(email: string, password: string,username:string): Observable<any> {
    return this.http.post<any>(this.apiUrl+ constantsNav.newU, { email, password,username }).pipe(
      tap(response => {
      })
    );
  }

  getIdToken(): string|null {
    return localStorage.getItem(constants.idToken);
  }

  getAllUsers(){
    return this.http.get<UserData[]>(this.apiUrl+constants.all)
  }

  isAdmin(idUser: any): Observable<any> {
    return this.http.get<any>('http://localhost:8090/role/is_admin/' + idUser);
  }

  getToken(): string|null {
    return this.jwtToken || localStorage.getItem(constants.jwtToken);
  }

  getAdminPerm(): string|null {
    return localStorage.getItem(constants.isAdmin);
  }

  logout(): void {
    this.jwtToken = null;
    localStorage.removeItem(constants.jwtToken);
  }
}
