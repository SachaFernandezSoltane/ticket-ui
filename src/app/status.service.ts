import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { StatusData } from './interfaces/status';
import * as constants from './const/service';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private apiUrl = 'http://localhost:8090/status';
  
  constructor(private http: HttpClient) {}
  
  getAllStatus(): Observable<StatusData[]> {
    return this.http.get<any>(this.apiUrl+constants.all)
  }
}
