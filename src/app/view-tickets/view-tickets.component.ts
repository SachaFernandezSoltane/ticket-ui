import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from '../navbar/navbar.component';
import { TicketService } from '../ticket.service';
import { TicketDataDisplay } from '../interfaces/ticket';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { NgIf, NgFor } from '@angular/common';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DialogData } from '../interfaces/DialogData';
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
  data: any[] = [];

  constructor(private ticketService: TicketService,private dialog: MatDialog){}

  ngOnInit(){
    this.fillData();
}

onDeleteClick(itemId: any) {
  console.log("Delete clicked for item with ID:", itemId);
  this.ticketService.deleteTicket(itemId).subscribe((response: any) => {
    this.refreshData();
  }, (error: any) => {
    console.error("Error deleting ticket:", error);
  });
}

openDialog(id: any): void {
  const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    data: {idToDelete : id},
  });

  dialogRef.componentInstance.onDeleteClicked.subscribe((idToDelete: any) => {
    this.onDeleteClick(idToDelete); 
  });

  dialogRef.afterClosed().subscribe((result: any) => {
    console.log('The dialog was closed');
  });
}

refreshData() {
  this.tickets = []
  this.fillData()
}

  onRowClick(row: any) {
    console.log("Ligne cliquée : ", row);
  }

  fillData() : void {
    this.ticketService.getAllTickets().subscribe((tickets: any[]) => {
    tickets.forEach((element:any) => {
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
    this.data = this.tickets;
  }, (error: any) => {
    console.error("Error fetching tickets:", error);
  });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  @Output() onDeleteClicked = new EventEmitter<any>();


  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() : void{
    this.onDeleteClicked.emit(this.data.idToDelete);
    this.dialogRef.close();    
  }
}
