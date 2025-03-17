import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from 'src/app/models/category';
import { ApiResponse } from 'src/app/interface/ApiResponse';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  category: Category | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCategory(+id);
    }
  }

  loadCategory(id: number): void {
    this.loading = true;
    this.categoryService.getCategoryById(id).subscribe({
      next: (response: ApiResponse<Category>) => {
        if (response && response.data) {
          this.category = response.data;
        } else {
          this.error = 'No category found.';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load category details. Please try again.';
        this.loading = false;
      }
    });
  }

  editCategory(): void {
    if (this.category) {
      this.router.navigate(['/category-form', this.category.id]);
    }
  }

  goBack(): void {
    this.router.navigate(['/categories']);
  }
}
