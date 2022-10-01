import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListMenuComponent } from './product-list-menu.component';

describe('ProductListMenuComponent', () => {
  let component: ProductListMenuComponent;
  let fixture: ComponentFixture<ProductListMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
