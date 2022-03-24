import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../../models/company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  company$: Observable<Company | undefined>;

  constructor(private companyService: CompanyService) {
    this.company$ = this.companyService.getCompanyObservable();
  }

  ngOnInit(): void {
  }

  saveCompany(company: any) {
    // this.companyService.saveCompany(company);
    this.companyService.saveCompany({ name: company.name });
  }

  editCompany(company: any) {
    this.companyService.editCompany(company)
  }

  deleteCompany() {
    this.companyService.deleteCompany();
  }
}
