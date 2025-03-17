import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductAd, AdType, Product } from '../../models/product.model';

@Component({
  selector: 'app-create-product-ad',
  templateUrl: './create-product-ad.component.html',
  styleUrls: ['./create-product-ad.component.css']
})
export class CreateProductAdComponent implements OnInit {
  productAdForm!: FormGroup;
  adTypes = Object.values(AdType);
  products: Product[] = [];
  submitted = false;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProducts();
  }

  private initForm(): void {
    this.productAdForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      currency: ['USD', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      adType: [AdType.Basic, Validators.required],
    });
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        this.error = 'Failed to load products.';
      }
    });
  }

  get f() {
    return this.productAdForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.productAdForm.invalid) {
      return;
    }

    this.loading = true;
    const productAd: ProductAd = this.productAdForm.value;

    this.productService.createProductAd(productAd).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/product-ads']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to create product ad. Please try again.';
      }
    });
  }
}
