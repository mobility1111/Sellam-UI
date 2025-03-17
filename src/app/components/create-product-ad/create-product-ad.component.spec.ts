import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductAdComponent } from './create-product-ad.component';

describe('CreateProductAdComponent', () => {
  let component: CreateProductAdComponent;
  let fixture: ComponentFixture<CreateProductAdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProductAdComponent]
    });
    fixture = TestBed.createComponent(CreateProductAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
