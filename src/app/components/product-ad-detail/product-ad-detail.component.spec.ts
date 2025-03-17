import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdDetailComponent } from './product-ad-detail.component';

describe('ProductAdDetailComponent', () => {
  let component: ProductAdDetailComponent;
  let fixture: ComponentFixture<ProductAdDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAdDetailComponent]
    });
    fixture = TestBed.createComponent(ProductAdDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
