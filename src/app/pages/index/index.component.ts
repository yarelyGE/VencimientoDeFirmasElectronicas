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
  
  mostrarError: boolean = false;

  select: string = 'fielnull';

  client: Client = {
    active: true,
    legalRepresentative: '',
    legalRepresentativeExpirationDate: '',
    legalRepresentativeRfc: '',
    imssExpirationDate: '',
    selloExpirationDate: '',
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
    try {
        if(this.client.nameClient !== undefined && this.client.nameClient !== '' && this.client.expirationDate !== undefined && this.client.expirationDate !== '' && this.client.rfc !== undefined && this.client.rfc !== ''){
          this.clientS.createClient(this.client);
          this.clearObjectClient();
        }
        else{
          this.mostrarError = true;
        }
    } catch (error) {
      console.log(error);
    }
  }

  actualizarCliente(){
    try{
      this.clientS.updateClient(this.client);
      this.clearObjectClient();
    }
    catch(error){
      console.log(error);
    }
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
      imssExpirationDate: '',
      selloExpirationDate: '',
      date: new Date()
    };
    this.clear();
  }

  clear() {
    this.client = {
      uid: '',
      nameClient: '',
      expirationDate: '',
      rfc: '',
      active: true,
      legalRepresentative: '',
      legalRepresentativeExpirationDate: '',
      legalRepresentativeRfc: '',
      imssExpirationDate: '',
      selloExpirationDate: '',
      date: new Date()
    };
  }

  consultClients() {
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
      });
      
      var listClientsTemp  = this.listClients;

      if(this.select == 'fielClientSelect') {
        for (let index = listClientsTemp.length -1 ; index >= 0 ; index--) {
          if (!this.verificarFecha(listClientsTemp[index]["expirationDate"])) {
            this.listClients.splice( index, 1 );
          }
        }
      } else if(this.select == 'fielRepresentanteSelect') {
        for (let index = listClientsTemp.length -1 ; index >= 0 ; index--) {
          if (!this.verificarFecha(listClientsTemp[index]["legalRepresentativeExpirationDate"])) {
            this.listClients.splice( index, 1 );
          }
        }
      } else if(this.select == 'selloSelect') {
        for (let index = listClientsTemp.length -1 ; index >= 0 ; index--) {
          if (!this.verificarFecha(listClientsTemp[index]["selloExpirationDate"])) {
            this.listClients.splice( index, 1 );
          }
        }
      } else if(this.select == 'imssSelect') {
        for (let index = listClientsTemp.length -1 ; index >= 0 ; index--) {
          if (!this.verificarFecha(listClientsTemp[index]["imssExpirationDate"])) {
            this.listClients.splice( index, 1 );
          }
        }
      }

    });
  }

  verificarFecha(fecha: string) {
    if (fecha != undefined && fecha != '') {
      const hoy = moment(new Date());
      const expiration1 = moment(fecha);
      const expirationDate = expiration1.diff(hoy, 'days');
      if (expirationDate <= 29) {
        return true;
      }
    }
    return false;
  }

}
