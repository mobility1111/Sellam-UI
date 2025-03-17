
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  loading = false;
  error: string | null = null;
  
  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 9; // 3 rows of 3 products each
  totalPages: number = 1;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;
    
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.totalPages = Math.ceil(this.products.length / this.pageSize);
        this.updatePaginatedProducts();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products. Please try again.';
        this.loading = false;
      }
    });
  }

  // Update the displayed products based on current page
  updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.products.length);
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  // Change current page
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    
    this.currentPage = page;
    this.updatePaginatedProducts();
    
    // Scroll to top of product list (optional)
    //window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}