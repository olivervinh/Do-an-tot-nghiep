import { Component, Input, OnInit } from '@angular/core';
import { TaoPhieuNhapService } from '../tao-phieu-nhap.service';
@Component({
  selector: 'app-tao-phieu-nhap-detail',
  templateUrl: './tao-phieu-nhap-detail.component.html',
  styleUrls: ['./tao-phieu-nhap-detail.component.scss']
})
export class TaoPhieuNhapDetailComponent implements OnInit {
  @Input() childMessage: string;
  constructor(private service: TaoPhieuNhapService) { }
  phieunhapchitietphieunhap: any
  ngOnInit(): void {
    this.service.getdetailphieunhap(this.service.idphieunhap).subscribe(
      result => {
        this.phieunhapchitietphieunhap = result as any
        console.log(this.phieunhapchitietphieunhap);
      },
      error => {
      }
    )
  }
  exportGeneratePdf() {
    window.open("https://localhost:44302/api/GeneratePdf/phieunhapdetail/" + this.phieunhapchitietphieunhap.id, "_blank");
  }
}
