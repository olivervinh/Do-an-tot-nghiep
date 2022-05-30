import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaoPhieuNhapSuccessComponent } from './tao-phieu-nhap-success.component';
describe('TaoPhieuNhapSuccessComponent', () => {
  let component: TaoPhieuNhapSuccessComponent;
  let fixture: ComponentFixture<TaoPhieuNhapSuccessComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaoPhieuNhapSuccessComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(TaoPhieuNhapSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
