import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdListComponent } from './product-ad-list.component';

describe('ProductAdListComponent', () => {
  let component: ProductAdListComponent;
  let fixture: ComponentFixture<ProductAdListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAdListComponent]
    });
    fixture = TestBed.createComponent(ProductAdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
