import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdminDeleteComponent } from './product-admin-delete.component';

describe('ProductAdminDeleteComponent', () => {
  let component: ProductAdminDeleteComponent;
  let fixture: ComponentFixture<ProductAdminDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAdminDeleteComponent]
    });
    fixture = TestBed.createComponent(ProductAdminDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
