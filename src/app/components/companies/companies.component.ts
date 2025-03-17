import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companies: Company[] = [];
  isVerifiedFilter?: boolean;
  loading = false;
  error: string | null = null;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.loading = true;
    this.error = null;
  
    this.companyService.getAllCompanies(this.isVerifiedFilter)
      .subscribe({
        next: (response) => {
          console.log("API Response:", response);
          if (response && response.success && response.data) {
            this.companies = response.data; 
          } else {
            this.companies = [];
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load companies. Please try again.';
          this.loading = false;
 
        }
      });
  }
  
  

  applyFilter(): void {
    console.log('Applying filter with isVerifiedFilter:', this.isVerifiedFilter); 
    this.loadCompanies();
  }

  resetFilter(): void {
    this.isVerifiedFilter = undefined;
    console.log('Resetting filter'); 
    this.loadCompanies();
  }
}