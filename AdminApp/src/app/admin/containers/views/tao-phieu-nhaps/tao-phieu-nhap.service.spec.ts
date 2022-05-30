import { TestBed } from '@angular/core/testing';
import { TaoPhieuNhapService } from './tao-phieu-nhap.service';
describe('TaoPhieuNhapService', () => {
  let service: TaoPhieuNhapService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaoPhieuNhapService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
