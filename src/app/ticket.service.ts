import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { StatusData } from './interfaces/status';
import * as constants from './const/service';
import { TicketData, TicketDataDisplay } from './interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrlTicket = 'http://localhost:8090/ticket';
  private apiUrlBug = 'http://localhost:8090/bug'
  private apiUrlFeature = 'http://localhost:8090/feature';
  
  
  constructor(private http: HttpClient) {}

  createTicket(Ticket: TicketData,typeTicket:String): Observable<any> {
    if(typeTicket == 'Ticket'){
      return this.http.post<any>(this.apiUrlTicket+constants.newT,Ticket)
    }else if(typeTicket == 'Bug'){
      return this.http.post<any>(this.apiUrlBug + constants.newT, Ticket);
    }else{
      return this.http.post<any>(this.apiUrlFeature+constants.newT,Ticket)
    }
  }

  getAllTickets(): Observable<TicketDataDisplay[]> {
    return this.http.get<TicketDataDisplay[]>(this.apiUrlTicket+constants.all)
  }

  getOneTicket(idTicket:string|null): Observable<any> {
    return this.http.get<any>(this.apiUrlTicket + '/' + idTicket)
  }

  deleteTicket(idTicket: any): Observable<any> {
    return this.http.delete(this.apiUrlTicket + '/' + idTicket)
      .pipe(
        catchError(this.handleError) // Gestion des erreurs
      );
  }

  updateTicket(newTicketInformations:any): Observable<any> {
    return this.http.put<any>(this.apiUrlTicket + '/update',newTicketInformations)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Une erreur côté client s'est produite, gérer ici
      console.error('An error occurred:', error.error.message);
    } else {
      // Le backend a renvoyé un code d'erreur, gérer ici
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Renvoyer une observable avec une erreur conviviale pour l'utilisateur
    return throwError(
      'Une erreur s\'est produite. Veuillez réessayer plus tard.');
  }
}
