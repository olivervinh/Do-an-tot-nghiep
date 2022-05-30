import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {
  constructor(    public toastr: ToastrService,) { }
  showToastDonHangTaoThanhCong(){
    this.toastr.success("Đơn hàng tạo thành công")
  }
  showToastThemThanhCong(){
    this.toastr.success("Thêm thành công")
  }
  showToastSuaThanhCong(){
    this.toastr.success("Sửa thành công")
  }
  showToastThemThatBai(){
    this.toastr.error("Thêm thất bại")
  }
  showToastSuaThatBai(){
    this.toastr.error("Sửa thất bại")
  }
  showToastXoaThanhCong(){
    this.toastr.success("Xóa thành công")
  }
  showToastXoaThatBai(){
    this.toastr.error("Xóa thất bại")
  }
  showToastDangNhapThanhCong(){
    this.toastr.success("Đăng nhập thành công")
  }
  showToastDangNhapThatBai(){
    this.toastr.error("Đăng nhập thất bại")
  }
}
