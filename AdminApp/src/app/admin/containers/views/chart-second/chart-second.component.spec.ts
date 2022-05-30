import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartSecondComponent } from './chart-second.component';
describe('ChartSecondComponent', () => {
  let component: ChartSecondComponent;
  let fixture: ComponentFixture<ChartSecondComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartSecondComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
