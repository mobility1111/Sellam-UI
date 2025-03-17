import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdToggleComponent } from './product-ad-toggle.component';

describe('ProductAdToggleComponent', () => {
  let component: ProductAdToggleComponent;
  let fixture: ComponentFixture<ProductAdToggleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAdToggleComponent]
    });
    fixture = TestBed.createComponent(ProductAdToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
