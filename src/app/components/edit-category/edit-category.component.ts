
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categoryId: number | null = null;
  loading = true;
  submitting = false;
  error: string | null = null;
  category: Category | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) {
    this.categoryForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.categoryId = +id;
        this.loadCategory(+id);
      } else {
        this.error = 'Category ID is required';
        this.loading = false;
      }
    });
  }

  loadCategory(id: number): void {
    this.loading = true;
    this.categoryService.getCategoryById(id).subscribe({
      next: (response: any) => {
        // Handle nested response if needed
        const category = response.data ? response.data : response;
        this.category = category;

        this.categoryForm.patchValue({
          name: category.name,
          description: category.description
        });
        
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Failed to load category. Please try again.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid || this.submitting) {
      return;
    }
  
  
    this.submitting = true;
    const formValue = this.categoryForm.value;
  
    if (this.categoryId) {
      const updatedCategory: Category = {
        ...this.category,
        ...formValue,
        id: this.categoryId
      };
  
      this.categoryService.updateCategory(updatedCategory).subscribe({
        next: () => {
          this.router.navigate(['/categories']);
        },
        error: (err) => {
          console.error('Error updating category:', err);
          this.error = 'Failed to update category. Please try again.';
          this.submitting = false;
          this.cdr.detectChanges();
        }
      });
    }
  }
  

  cancel(): void {
    this.router.navigate(['/categories']);
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
}