import { Component, OnInit } from '@angular/core';

import { Client } from '../../models/client.model';

// Services
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: []
})
export class IndexComponent implements OnInit {

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
          ...e.payload.doc.data()
        } as Client;
      })
    });
  }

  saveClient() {
    if (this.client.uid != undefined) {
      this.clientS.updateClient(this.client);
    } else {
      this.clientS.createClient(this.client);
    }

    this.clearObjectClient();
  }

  getClient(uid: string) {
    this.clientS.getClient(uid).subscribe((data) => {
      this.client = data;
      this.client.uid = uid;
    });
  }

  deleteClient(uid: string) {
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

}
