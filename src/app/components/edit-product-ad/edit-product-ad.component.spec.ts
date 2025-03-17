import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductAdComponent } from './edit-product-ad.component';

describe('EditProductAdComponent', () => {
  let component: EditProductAdComponent;
  let fixture: ComponentFixture<EditProductAdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProductAdComponent]
    });
    fixture = TestBed.createComponent(EditProductAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
