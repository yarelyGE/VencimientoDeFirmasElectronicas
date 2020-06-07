import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client.model';
import * as moment from 'moment';

// Services
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {
  error:string = "";
  mostrarError: boolean = false;

  select: string = '';

  client: Client = {
    active: true,
    legalRepresentative: '',
    legalRepresentativeExpirationDate: '',
    legalRepresentativeRfc: '',
    date: new Date()
  };

  listClients: Client[] = [];

  constructor(public clientS: ClientService) { }


  ngOnInit(): void {
    this.getClients();
  }

  private getClients() {
    this.clientS.getClients().subscribe(data => {
      this.listClients = data.map(e => {
        return {
          uid: e.payload.doc.id,
          date: e.payload.doc.data()['date'],
          expirationDate: e.payload.doc.data()['expirationDate'],
          imssExpirationDate: e.payload.doc.data()['imssExpirationDate'],
          legalRepresentative: e.payload.doc.data()['legalRepresentative'],
          legalRepresentativeExpirationDate: e.payload.doc.data()['legalRepresentativeExpirationDate'],
          legalRepresentativeRfc: e.payload.doc.data()['legalRepresentativeRfc'],
          nameClient: e.payload.doc.data()['nameClient'],
          rfc: e.payload.doc.data()['rfc'],
          selloExpirationDate: e.payload.doc.data()['selloExpirationDate'],
        } as Client;
      })
    });
  }

  saveClient() {
    if (this.client.uid != undefined) {
      this.clientS.updateClient(this.client);
    } else {
      if(this.client.nameClient !== undefined && this.client.expirationDate !== undefined && this.client.rfc !== undefined){
        this.clientS.createClient(this.client);        
      }
      else{
        this.mostrarError = true;
      }
    }
    this.clearObjectClient();
  }

  getClient(uid: string) {
    this.clientS.getClient(uid).subscribe((data) => {
      this.client = data;
      this.client.uid = uid;
    });
  }

  banClient(uid: string) {
    this.clientS.banClient(uid);
  }

  deleteClient(uid: string){
    this.clientS.deleteClient(uid);
  }

  clearObjectClient() {
    this.client = {
      uid: '',
      nameClient: '',
      expirationDate: '',
      rfc: '',
      active: true,
      legalRepresentative: '',
      legalRepresentativeExpirationDate: '',
      legalRepresentativeRfc: '',
      date: new Date()
    };
  }

  consultClients() {
    this.clientS.getClients().subscribe(data => {
      this.listClients = data.map(e => {
        if(this.select == 'fielClientSelect') {
          if (this.verificarFecha(e.payload.doc.data()['expirationDate'])) {
            return {
              uid: e.payload.doc.id,
              date: e.payload.doc.data()['date'],
              expirationDate: e.payload.doc.data()['expirationDate'],
              imssExpirationDate: e.payload.doc.data()['imssExpirationDate'],
              legalRepresentative: e.payload.doc.data()['legalRepresentative'],
              legalRepresentativeExpirationDate: e.payload.doc.data()['legalRepresentativeExpirationDate'],
              legalRepresentativeRfc: e.payload.doc.data()['legalRepresentativeRfc'],
              nameClient: e.payload.doc.data()['nameClient'],
              rfc: e.payload.doc.data()['rfc'],
              selloExpirationDate: e.payload.doc.data()['selloExpirationDate'],
            } as Client;
          }
        } else if(this.select == 'fielRepresentanteSelect') {
          if (this.verificarFecha(e.payload.doc.data()['legalRepresentativeExpirationDate'])) {
            return {
              uid: e.payload.doc.id,
              date: e.payload.doc.data()['date'],
              expirationDate: e.payload.doc.data()['expirationDate'],
              imssExpirationDate: e.payload.doc.data()['imssExpirationDate'],
              legalRepresentative: e.payload.doc.data()['legalRepresentative'],
              legalRepresentativeExpirationDate: e.payload.doc.data()['legalRepresentativeExpirationDate'],
              legalRepresentativeRfc: e.payload.doc.data()['legalRepresentativeRfc'],
              nameClient: e.payload.doc.data()['nameClient'],
              rfc: e.payload.doc.data()['rfc'],
              selloExpirationDate: e.payload.doc.data()['selloExpirationDate'],
            } as Client;
          }
        } else if(this.select == 'selloSelect') {
          if (this.verificarFecha(e.payload.doc.data()['selloExpirationDate'])) {
            return {
              uid: e.payload.doc.id,
              date: e.payload.doc.data()['date'],
              expirationDate: e.payload.doc.data()['expirationDate'],
              imssExpirationDate: e.payload.doc.data()['imssExpirationDate'],
              legalRepresentative: e.payload.doc.data()['legalRepresentative'],
              legalRepresentativeExpirationDate: e.payload.doc.data()['legalRepresentativeExpirationDate'],
              legalRepresentativeRfc: e.payload.doc.data()['legalRepresentativeRfc'],
              nameClient: e.payload.doc.data()['nameClient'],
              rfc: e.payload.doc.data()['rfc'],
              selloExpirationDate: e.payload.doc.data()['selloExpirationDate'],
            } as Client;
          }
        } else if(this.select == 'imssSelect') {
          if (this.verificarFecha(e.payload.doc.data()['imssExpirationDate'])) {
            return {
              uid: e.payload.doc.id,
              date: e.payload.doc.data()['date'],
              expirationDate: e.payload.doc.data()['expirationDate'],
              imssExpirationDate: e.payload.doc.data()['imssExpirationDate'],
              legalRepresentative: e.payload.doc.data()['legalRepresentative'],
              legalRepresentativeExpirationDate: e.payload.doc.data()['legalRepresentativeExpirationDate'],
              legalRepresentativeRfc: e.payload.doc.data()['legalRepresentativeRfc'],
              nameClient: e.payload.doc.data()['nameClient'],
              rfc: e.payload.doc.data()['rfc'],
              selloExpirationDate: e.payload.doc.data()['selloExpirationDate'],
            } as Client;
          }
        }
      })
    });
  }

  verificarFecha(fecha: string) {
    const hoy = moment(new Date());
    const expiration1 = moment(fecha);
    const expirationDate = expiration1.diff(hoy, 'days');
    if (expirationDate <= 29) {
      return true;
    }
    return false;
  }

}
