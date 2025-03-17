import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product-ad',
  templateUrl: './edit-product-ad.component.html',
  styleUrls: ['./edit-product-ad.component.css']
})
export class EditProductAdComponent implements OnInit {
  editProductAdForm!: FormGroup;
  isLoading: boolean = false;
  productId!: string;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') || '';

      if (!this.productId) {
        this.errorMessage = 'Invalid product ID';
        this.router.navigate(['/product-ads']);
        return;
      }

      this.initializeForm();
      this.loadProductAd();
    });
  }

  private initializeForm(): void {
    this.editProductAdForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      //description: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      amount: [null, [Validators.required, Validators.min(0)]],
      //adType: ['', [Validators.required]]
    });
  }

  private loadProductAd(): void {
    this.isLoading = true;
    this.productService.getProductAdById(this.productId).subscribe({
      next: (productAd) => {
        if (productAd) {
          this.editProductAdForm = this.fb.group({
            title: [productAd.title, [Validators.required, Validators.maxLength(100)]],
            currency: [productAd.currency, [Validators.required]],
            amount: [productAd.amount, [Validators.required, Validators.min(0)]],
            //adType: [productAd.adType, [Validators.required]]
          });
        } else {
          this.errorMessage = 'Product ad not found';
          this.router.navigate(['/product-ads']);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading product ad:', err);
        this.errorMessage = 'Failed to load product ad';
        this.isLoading = false;
        this.router.navigate(['/product-ads']);
      }
    });
  }
  onSubmit(): void {
    if (this.editProductAdForm.invalid) {
      return;
    }

    this.isLoading = true;
    const updatedAd = { ...this.editProductAdForm.value, id: this.productId };

    this.productService.updateProductAd(updatedAd).subscribe({
      next: () => {
        this.successMessage = 'Product ad updated successfully';
        this.router.navigate(['/product-ads']);
      },
      error: () => {
        this.errorMessage = 'Failed to update product ad';
        this.isLoading = false;
      }
    });
  }

  get f() {
    return this.editProductAdForm.controls;
  }
}