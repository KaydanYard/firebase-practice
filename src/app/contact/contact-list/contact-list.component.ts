import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  companies$: Observable<Company[]>;

  public contacts$: Observable<Contact[] | undefined> | undefined;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(companyId: string = null) {
    this.contacts$ = this.contactService.getContactsObservable(companyId);
  }

}
