import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaoPhieuNhapDetailComponent } from './tao-phieu-nhap-detail.component';
describe('TaoPhieuNhapDetailComponent', () => {
  let component: TaoPhieuNhapDetailComponent;
  let fixture: ComponentFixture<TaoPhieuNhapDetailComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaoPhieuNhapDetailComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(TaoPhieuNhapDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
