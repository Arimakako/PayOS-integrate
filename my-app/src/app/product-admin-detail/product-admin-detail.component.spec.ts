import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdminDetailComponent } from './product-admin-detail.component';

describe('ProductAdminDetailComponent', () => {
  let component: ProductAdminDetailComponent;
  let fixture: ComponentFixture<ProductAdminDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAdminDetailComponent]
    });
    fixture = TestBed.createComponent(ProductAdminDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
