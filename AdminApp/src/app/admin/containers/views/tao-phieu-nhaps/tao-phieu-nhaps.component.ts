import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { PhieuNhap, TaoPhieuNhapService } from "./tao-phieu-nhap.service";
import * as signalR from "@microsoft/signalr";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { ToastServiceService } from "../../shared/toast-service.service";
import { TaoPhieuNhapComponent } from "./tao-phieu-nhap/tao-phieu-nhap.component";
@Component({
  selector: "app-tao-phieu-nhaps",
  templateUrl: "./tao-phieu-nhaps.component.html",
  styleUrls: ["./tao-phieu-nhaps.component.scss"],
})
export class TaoPhieuNhapsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public service: TaoPhieuNhapService,
    public router: Router,
    public http: HttpClient,
    public dialog: MatDialog,
    public serviceToast: ToastServiceService
  ) {}
  displayedColumns: string[] = [
    "id",
    "soChungTu",
    "tenNhaCungCap",
    "ngayTao",
    "tongTien",
    "nguoiLapPhieu",
    "actions",
  ];
  ngOnInit(): void {
    this.service.getAllPhieuNhaps();
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl("https://localhost:44302/notify")
      .build();
    connection
      .start()
      .then(function () {
        console.log("SignalR Connected!");
      })
      .catch(function (err) {
        return console.error(err.toString());
      });
    connection.on("BroadcastMessage", () => {
      this.service.getAllPhieuNhaps();
    });
  }
  doFilter = (value: string) => {
    this.service.dataSource.filter = value.trim().toLocaleLowerCase();
  };
  ngAfterViewInit(): void {
    this.service.dataSource.sort = this.sort;
    this.service.dataSource.paginator = this.paginator;
  }
  addphieu() {
    this.service.phieunhap = new PhieuNhap();
    this.router.navigate(["admin/taophieunhap/them"]);
  }
  exportGeneratePdf() {
    window.open("https://localhost:44302/api/GeneratePdf/allphieunhap", "_blank");
  }
  populateForm(id: any) {
    this.service.idphieunhap = id;
    this.router.navigate(["admin/taophieunhap/detail/" + id]);
  }
  clickDelete(id) {
    if (confirm("Bạn có chắc chắn xóa bản ghi này không ??")) {
      this.service.delete(id).subscribe(
        (res) => {
          this.serviceToast.showToastXoaThanhCong();
          this.service.getAllPhieuNhaps();
        },
        (err) => {
          this.serviceToast.showToastXoaThatBai();
        }
      );
    }
  }
}
