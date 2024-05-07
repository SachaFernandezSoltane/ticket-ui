export interface TicketData {
    titreTicket: string;
    userTicket: number;
    statusTicket: number;
    descriptionTicket: string;
  }

  export interface TicketDataDisplay {
    idTicket:number|undefined;
    titreTicket: string;
    userTicket: number|undefined;
    statusTicket: number|undefined;
    descriptionTicket: string;
  }