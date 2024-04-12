import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusData } from './interfaces/status';
import * as constants from './const/service';
import { TicketData } from './interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'http://localhost:8090/ticket';
  
  constructor(private http: HttpClient) {}
  
  // createTicket(titreTicket:String,userTicket:number,typeTicket:String,statusTicket:number,descriptionTicket:String): Observable<any> {
  //   return this.http.post<any>(this.apiUrl+constants.newT,{titreTicket,})
  // }
  createTicket(Ticket: TicketData): Observable<any> {
    return this.http.post<any>(this.apiUrl+constants.newT,{Ticket})
  }
}
