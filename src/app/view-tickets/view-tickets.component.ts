import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as constantNav from '../const/nav';
import { root } from '../const/nav';
import { DialogData } from '../interfaces/DialogData';
import { TicketDataDisplay } from '../interfaces/ticket';
import { NavbarComponent } from '../navbar/navbar.component';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-view-tickets',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, NavbarComponent, MatDividerModule, MatIconModule, NgFor, NgIf],
  templateUrl: './view-tickets.component.html',
  styleUrl: './view-tickets.component.scss'
})

export class ViewTicketsComponent {
  tickets: any[] = [];
  displayedColumns: string[] = ['idTicket', 'titreTicket', 'userTicket', 'statusTicket', 'descriptionTicket'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: any[] = [];
  utilisateurAdmin: boolean = false;

  constructor(private ticketService: TicketService, private dialog: MatDialog, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (!this.authService.getToken()) {
      // Rediriger l'utilisateur vers la page principale
      this.router.navigateByUrl(root);
    }

    this.isAdmin();
    if (!this.utilisateurAdmin) {
      this.router.navigate([constantNav.viewTicketsUsers]);
    }

    this.fillData();
  }

  isAdmin(): void {
    const is_admin = this.authService.getAdminPerm()
    if (is_admin == "true") {
      this.utilisateurAdmin = true
    } else {
      this.utilisateurAdmin = false
    }

  }


  toUpdateTicket(idTicket: any) {
    const url: any[] = [constantNav.detailsTickets, idTicket];
    this.router.navigate(url);

  }

  onDeleteClick(itemId: any) {
    this.ticketService.deleteTicket(itemId).subscribe((response: any) => {
      this.refreshData();
    }, (error: any) => {
      console.error("Error deleting ticket:", error);
    });
  }

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { idToDelete: id },
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

  fillData(): void {
    this.ticketService.getAllTickets().subscribe((tickets: any[]) => {
      tickets.forEach((element: any) => {
        const newT: TicketDataDisplay = {
          idTicket: undefined,
          titreTicket: "Titre du ticket",
          userTicket: undefined,
          statusTicket: undefined,
          descriptionTicket: "Description du ticket"
        };

        if (element['status']) {
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
  ) { }

  @Output() onDeleteClicked = new EventEmitter<any>();


  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.onDeleteClicked.emit(this.data.idToDelete);
    this.dialogRef.close();
  }
}
