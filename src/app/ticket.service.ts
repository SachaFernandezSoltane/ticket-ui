import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  deleteTicket(idTicket:number): any {
    return this.http.delete(this.apiUrlTicket+'/'+idTicket)
  }
}
