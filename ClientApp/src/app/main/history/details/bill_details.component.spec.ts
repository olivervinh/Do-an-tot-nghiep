import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillDetailsComponent } from './bill_details.component';
describe('ContactComponent', () => {
  let component: BillDetailsComponent;
  let fixture: ComponentFixture<BillDetailsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillDetailsComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(BillDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
