import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { StatusService } from '../status.service';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { AuthService } from '../auth.service';
import { UserData } from '../interfaces/user';
import { StatusData } from '../interfaces/status';
import { Router } from '@angular/router';
import { root } from '../const/nav';
@Component({
  selector: 'app-form-create-ticket',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,NavbarComponent,NgFor],
  templateUrl: './form-create-ticket.component.html',
  styleUrl: './form-create-ticket.component.scss'
})
export class FormCreateTicketComponent {
  statusList: StatusData[] = []; 
  usersList: UserData[] = [];
  constructor(private http: HttpClient,private statusService: StatusService,private authService:AuthService,private router:Router) { 
  }
  
  ngOnInit(){

    if (!this.authService.getToken()) {
      // Rediriger l'utilisateur vers la page principale
      this.router.navigateByUrl(root);
    }
    this.statusService.getAllStatus().subscribe(
      (response) => {
        this.statusList = response; 
      },
      (error) => {
        console.error("Erreur :", error);
      }
    );
    
    this.authService.getAllUsers().subscribe(
      (response) => {
        this.usersList = response; 
      },
      (error) => {
        console.error("Erreur :", error);
      }
    );
  }
}
