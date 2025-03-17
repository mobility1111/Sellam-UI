import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductAd } from '../../models/product.model';

@Component({
  selector: 'app-product-ad-list',
  templateUrl: './product-ad-list.component.html',
  styleUrls: ['./product-ad-list.component.css']
})
export class ProductAdListComponent implements OnInit {
  productAds: ProductAd[] = [];
  loading = false;
  error = '';
  isActiveFilter = true; // Default to showing active ads

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProductAds();
  }

  loadProductAds(): void {
    this.loading = true;
    this.productService.getProductAds(this.isActiveFilter).subscribe({
      next: (ads) => {
        this.productAds = ads;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load product ads. Please try again.';
        this.loading = false;
        console.error('Error loading product ads:', err);
      }
    });
  }

  toggleFilter(): void {
    this.isActiveFilter = !this.isActiveFilter;
    this.loadProductAds();
  }

  onStatusChanged(ad: ProductAd, newStatus: boolean): void {
    // Update the local model to reflect the change
    ad.isActive = newStatus;
    
    if (this.isActiveFilter !== ad.isActive) {
      this.loadProductAds();
    }
  }
}