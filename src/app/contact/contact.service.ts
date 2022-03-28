import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Observable, throwError } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentChangeAction } from "@angular/fire/compat/firestore";
import { from } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactRef: AngularFirestoreDocument<Contact>;
  private contactsRef: AngularFirestoreCollection<Contact>;

  constructor(private db: AngularFirestore) {
    this.contactRef = this.db.doc<Contact>('contacts/XS738RCin3LZkboSBWsE');
    this.contactsRef = this.db.collection<Contact>('contacts');
  }

  getContactObservable(id: string): Observable<Contact> {
    return this.db.doc<Contact>(`contacts/${id}`)
      .valueChanges()
      .pipe(                          // <-- new
        catchError(this.errorHandler) // <-- new
      );                              // <-- new
  }

  getContactsObservable(): Observable<Contact[] | undefined> {
    return this.contactsRef.snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<Contact>[]): Contact[] => {
          return items.map((item: DocumentChangeAction<Contact>): Contact => {
            return {
              id: item.payload.doc.id,
              name: item.payload.doc.data().name,
              phone: item.payload.doc.data().phone
            };
          });
        }),
        catchError(this.errorHandler)
      );
  }

  saveContact(contact: Contact) {
    this.contactsRef.add(contact)
      .then(_ => console.log('success on add'))
      .catch(error => console.log('add', error));
  }

  editContact(contact: Contact) {
    this.contactsRef.doc(contact.id).update(contact)
      .then(_ => console.log('Success on update'))
      .catch(error => console.log('update', error));
  }

  deleteContact(id: string) {
    return this.contactsRef.doc(id).delete()
      .then(_ => console.log('Success on delete'))
      .catch(error => console.log('delete', error));
  }

  private errorHandler(error) {
    console.log(error);
    return throwError(error);
  }

}

