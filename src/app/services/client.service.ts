import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  client: Client = {};

  constructor(private firestore: AngularFirestore) { }

  getClients() {
    return this.firestore.collection('clients',ref => ref.where('active', '==', true)).snapshotChanges();
  }

  getClient(uid: string) {
    return this.firestore.doc('clients/' + uid).valueChanges();
  }

  createClient(client: Client){
    return this.firestore.collection('clients').add(client);
  }

  updateClient(client: Client){
    return this.firestore.doc('clients/' + client.uid).update(client);
  }

  deleteClient(uid: string){
    this.getClient(uid).subscribe((data) => {
      this.client = data;
      this.client.active = false;
      this.firestore.doc('clients/' + uid).update(this.client);
    });
  }
}
