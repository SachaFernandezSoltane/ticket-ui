import { Component, EventEmitter } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from '../navbar/navbar.component';
import { TicketService } from '../ticket.service';
import { TicketData, TicketDataDisplay } from '../interfaces/ticket';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { NgIf, NgFor } from '@angular/common';

const ELEMENT_DATA: any[] = [
  {id: 1, name: 'Hydrogen', status: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-view-tickets',
  standalone: true,
  imports: [MatButtonModule, MatTableModule,NavbarComponent, MatDividerModule, MatIconModule,NgFor,NgIf],
  templateUrl: './view-tickets.component.html',
  styleUrl: './view-tickets.component.scss'
})
export class ViewTicketsComponent {
  tickets:any[] = [];
  displayedColumns: string[] = ['idTicket', 'titreTicket','userTicket','statusTicket','descriptionTicket'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: any[] = ELEMENT_DATA;

  constructor(private ticketService: TicketService){}

  ngOnInit(){
    this.ticketService.getAllTickets().subscribe((response:any) => {
      console.error("Response :", response);
      response.forEach((element:any) => {
        const newT: TicketDataDisplay = {
          idTicket : undefined,
          titreTicket: "Titre du ticket",
          userTicket: undefined,
          statusTicket: undefined,
          descriptionTicket: "Description du ticket"
        };       

        if(element['status']){
          newT.statusTicket = element['status']['userStatus']
        }
        newT.idTicket = element['id']
        newT.descriptionTicket = element['description']
        newT.titreTicket = element['name']
        newT.userTicket = element['user']['username']
        this.tickets.push(newT);
      });
      this.data = this.tickets
    },
    (error) => {
      console.error("Erreur :", error);
    }
  );
}

  addColumn() {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }

  shuffle() {
    let currentIndex = this.columnsToDisplay.length;
    while (0 !== currentIndex) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Swap
      let temp = this.columnsToDisplay[currentIndex];
      this.columnsToDisplay[currentIndex] = this.columnsToDisplay[randomIndex];
      this.columnsToDisplay[randomIndex] = temp;
    }
  }

  onDeleteClick(itemId: any) {
    console.log("Delete clicked for item with ID:", itemId);
    this.ticketService.deleteTicket(itemId).subscribe((response: any) => {
      console.log("Ticket deleted successfully.", response);
      // Si vous avez besoin de faire quelque chose après la suppression, vous pouvez le faire ici
    }, (error: any) => {
      console.error("Error deleting ticket:", error);
      // Gérer les erreurs de suppression ici
    });
  }
}
