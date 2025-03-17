import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductAd } from '../../models/product.model';

@Component({
  selector: 'app-product-ad-detail',
  templateUrl: './product-ad-detail.component.html',
  styleUrls: ['./product-ad-detail.component.css']
})
export class ProductAdDetailComponent implements OnInit {
  productAd: ProductAd | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProductAd();
  }

  loadProductAd(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Invalid product ad ID';
      this.loading = false;
      return;
    }

    this.productService.getProductAdById(id).subscribe({
      next: (ad) => {
        if (ad) {
          this.productAd = ad;
          this.loading = false;
          this.cdr.detectChanges();
        } else {
          this.error = 'Product ad not found.';
          this.loading = false;
        }
      },
      error: (err) => {
        this.error = 'Failed to load product ad details. Please try again.';
        this.loading = false;
        console.error('Error loading product ad details:', err);
      }
    });
  }

  formatAdType(adType: string): string {
    return adType ? adType.charAt(0).toUpperCase() + adType.slice(1).toLowerCase() : '';
  }

  getFormattedAdType(): string {
    return this.formatAdType(this.productAd?.adType || '');
  }

  onStatusChanged(newStatus: boolean): void {
    if (this.productAd) {
      this.productAd.isActive = newStatus;
      this.cdr.detectChanges();
    }
  }

  navigateToEdit(): void {
    if (this.productAd?.id) {
      this.router.navigate(['/edit-product-ad', this.productAd.id]);
    }
  }

  navigateBack(): void {
    this.router.navigate(['/product-ads']);
  }
}
