import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdetailComponent } from './productdetail.component';

describe('ProductdetailComponent', () => {
  let component: ProductdetailComponent;
  let fixture: ComponentFixture<ProductdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
