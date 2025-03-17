import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-ad-toggle',
  templateUrl: './product-ad-toggle.component.html',
  styleUrls: ['./product-ad-toggle.component.css']
})
export class ProductAdToggleComponent {
  @Input() adId!: number;
  @Input() isActive: boolean = false;
  @Output() statusChanged = new EventEmitter<boolean>();

  loading = false;
  error = '';

  constructor(private productService: ProductService) { }

  toggleStatus(): void {
    if (this.adId == null) {  // Ensure adId is defined
      this.error = 'Invalid advertisement ID';
      return;
    }
  
    this.loading = true;
  
    this.productService.toggleProductAdStatus(this.adId).subscribe({
      next: () => {
        this.isActive = !this.isActive;
        this.statusChanged.emit(this.isActive);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error toggling status:', err);
        this.error = err?.error?.message || 'Failed to toggle status.';
        this.loading = false;
      }
    });
  }
  
  
}
