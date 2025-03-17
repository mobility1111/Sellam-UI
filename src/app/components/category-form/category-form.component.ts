import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  submitting = false;
  error: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.createForm();
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.categoryForm.invalid || this.submitting) {
      return;
    }

    this.submitting = true;
    const formData = new FormData();
    formData.append('Name', this.categoryForm.get('name')?.value);
    formData.append('Description', this.categoryForm.get('description')?.value);
    
    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    }

    this.categoryService.addCategory(formData).subscribe({
      next: () => {
        this.router.navigate(['/categories']);
      },
      error: (err) => {
        this.error = 'Failed to create category. Please try again.';
        this.submitting = false;
      }
    });
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