import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiscoutCodesComponent } from './discout-codes.component';
describe('DiscoutCodesComponent', () => {
  let component: DiscoutCodesComponent;
  let fixture: ComponentFixture<DiscoutCodesComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoutCodesComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoutCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
