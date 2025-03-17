import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  loading = true;
  error: string | null = null;
  
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  
  ngOnInit(): void {
    console.log('Component initialized');
    this.loadCategories();
  }
  
  loadCategories(): void {
    console.log('Loading categories...');
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (response: any) => {
        console.log('Response received:', response);

        if (response && 'data' in response && Array.isArray(response.data)) {
          this.categories = response.data;
        } else if (Array.isArray(response)) {
          this.categories = response;
        } else {
          console.error('Unexpected data format:', response);
          this.error = 'Data format error';
        }
        
        console.log('Categories after processing:', this.categories);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Failed to load categories. Please try again.';
        this.loading = false;
      }
    });
  }
  
  addNewCategory(): void {
    this.router.navigate(['/category-form']);
  }
  
  editCategory(id: number): void {
  
    this.router.navigate(['/category-edit', id]);
  }
  
  viewCategoryDetails(id: number): void {
    this.router.navigate(['/category-detail', id]);
  }
  
  
}




