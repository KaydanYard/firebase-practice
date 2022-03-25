import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Contact } from '../../models/compony';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  contact$: Observable<Contact | undefined>;
  router: any;

  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute
  ) {
    if (!this.isNew) {
      this.contact$ = contactService.getContactObservable(this.id);
    } else {
      this.contact$ = of({}) as Observable<Contact>;
    }
  }

  get id(): string {
    return this.activatedRoute.snapshot.paramMap.get('id')
  }

  get isNew(): boolean {
    return this.id === 'new';
  }

  ngOnInit(): void {
  }

  saveContact(contact: any) {
    this.contactService.saveContact({
      name: contact.name,
      phone: ''
    });
  }

  editContact(contact: any) {
    this.contactService.editContact(contact)
  }

  deleteContact() {
    this.contactService.deleteContact(this.id)
      .then(_ => this.router.navigate(['/contact/all']));
  }
}
