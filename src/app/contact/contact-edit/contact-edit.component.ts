import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CompanyService } from 'src/app/company/company.service';
import { Company } from 'src/app/models/company';
import { Contact } from '../../models/contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  companies$: Observable<Company[]>;
  contact$: Observable<Contact | undefined>;
  router: any;

  constructor(
    private companyService: CompanyService,
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute
  ) {
    this.companies$ = companyService.getCompaniesObservable(); // step 3

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
      companyId: contact.id,
      name: contact.name,
      phone: ''
    });
  }

  editContact(contact) {
    this.contactService.editContact(contact) // step 4
      .then(_ => this.router.navigate(['/contact/all']));
  }

  deleteContact() {
    this.contactService.deleteContact(this.id)
      .then(_ => this.router.navigate(['/contact/all']));
  }
}