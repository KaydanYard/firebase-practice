import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Company } from '../../models/company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  company$: Observable<Company | undefined>;
  router: any;

  constructor(
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute
  ) {
    if (!this.isNew) {
      this.company$ = companyService.getCompanyObservable(this.id);
    } else {
      this.company$ = of({}) as Observable<Company>;
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

  saveCompany(company: any) {
    this.companyService.saveCompany({
      name: company.name,
      phone: ''
    });
  }

  editCompany(company: any) {
    this.companyService.editCompany(company)
  }

  deleteCompany() {
    this.companyService.deleteCompany(this.id)
      .then(_ => this.router.navigate(['/company/all']));
  }
}
