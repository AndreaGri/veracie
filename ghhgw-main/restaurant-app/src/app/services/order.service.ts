import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  query, 
  where, 
  orderBy, 
  addDoc, 
  updateDoc, 
  doc 
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly firestore = inject(Firestore);

  getOrdersByTable(tableId: string): Observable<any[]> {
    // Specifichiamo sempre l'istanza 'this.firestore'
    const colRef = collection(this.firestore, 'ordini');
    const q = query(colRef, where('note', '==', tableId));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  getAdminOrders(): Observable<any[]> {
    const colRef = collection(this.firestore, 'ordini');
    const q = query(colRef, orderBy('timestamp', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  async sendOrder(piatti: any[], note: string) {
    const colRef = collection(this.firestore, 'ordini');
    return addDoc(colRef, {
      piatti,
      note,
      stato: 'in attesa',
      totale: piatti.reduce((acc: number, p: any) => acc + (p.prezzo || 0), 0),
      timestamp: new Date().toISOString()
    });
  }

  async updateStatus(id: string, s: string) {
    // Sintassi corretta per evitare mismatch: (istanza, nome_collezione, id_documento)
    const docRef = doc(this.firestore, 'ordini', id);
    return updateDoc(docRef, { stato: s });
  }
}
