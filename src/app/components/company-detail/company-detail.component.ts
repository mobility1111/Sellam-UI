import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  company: Company | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.findCompanyInList(id);
      } else {
        this.error = 'No company ID provided';
      }
    });
  }

  findCompanyInList(userId: string): void {
    this.loading = true;
    
    // Get all companies and then find the one we want
    this.companyService.getAllCompanies()
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const foundCompany = response.data.find(c => c.userId === userId);
            
            if (foundCompany) {
              this.company = foundCompany;
              this.loading = false;
              console.log('Company found in list:', this.company);
            } else {
              this.loadCompanyDirectly(userId);
            }
          } else {
            this.error = response.message || 'Failed to load companies';
            this.loading = false;
          }
        },
        error: (err) => {
          this.error = 'Failed to load companies. Please try again.';
          this.loading = false;
        }
      });
  }

  loadCompanyDirectly(userId: string): void {
    this.loading = true;
    
    this.companyService.getCompanyByUserId(userId)
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.company = response.data;
            this.loading = false;
          } else {
            this.error = response.message || 'Company not found';
            this.loading = false;
          }
        },
        error: (err) => {
          if (err.message) {
            this.error = err.message;
          } else {
            this.error = 'Failed to find company details.';
          }
          this.loading = false;
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/companies']);
  }
}