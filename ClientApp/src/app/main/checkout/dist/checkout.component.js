"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.deleteProduct = exports.CheckoutComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var CheckoutComponent = /** @class */ (function () {
    function CheckoutComponent(http, cartService, userService, router) {
        var _this = this;
        this.http = http;
        this.cartService = cartService;
        this.userService = userService;
        this.router = router;
        userService.checkLogin();
        this.id_user = localStorage.getItem('idUser');
        this.Tinh = null;
        this.http.get("https://provinces.open-api.vn/api/?depth=3").subscribe(function (res) {
            _this.list_tinh_thanh = res;
        });
        this.http.post(environment.URL_API+"Carts/getCart/" + this.id_user, {}).subscribe(function (res) {
            _this.list_item = res;
            console.log(_this.list_item);
            _this.tongtien = 0;
            for (var i = 0; i < _this.list_item.length; i++) {
                _this.tongtien = _this.tongtien + (_this.list_item[i].productDetail.giaBan * _this.list_item[i].soLuong);
                _this.tongThanhToan = _this.tongtien + 25000;
            }
        });
        this.http.get(environment.URL_API+"hoadons/magiamgia/").subscribe(function (res) {
            _this.list_MGG = res;
        });
        //this.checkdiachi=true;
        this.list_MGGSD = [];
        this.check = null;
        this.http.post(environment.URL_API+"Auth/getDiaChi/", {
            id_user: this.id_user
        }).subscribe(function (res) {
            _this.DiaChiDefaul = res;
            _this.DiaChi = _this.DiaChiDefaul;
        });
        this.checkdiachi = true;
    }
    CheckoutComponent.prototype.changeValue = function (value) {
        this.checkdiachi = !value;
        if (this.check) {
            this.DiaChi = this.DiaChiDefaul;
        }
        else {
            this.DiaChi = '';
        }
    };
    CheckoutComponent.prototype.deleteSanPham = function (item) {
        var _this = this;
        var clicks = localStorage.getItem('idUser');
        var delproduct = new deleteProduct();
        delproduct.id_sanpham = item.idSanPhamBienThe;
        delproduct.user_ID = clicks;
        console.log(delproduct);
        this.http.post(environment.URL_API+"Carts/delete", delproduct).subscribe(function (res) {
            sweetalert2_1["default"].fire("Xoá sản phẩm thành công .", '', 'success');
            _this.http.post(environment.URL_API+"Carts/getCart/" + clicks, {}).subscribe(function (res) {
                _this.list_item = res;
                _this.tongtien = 0;
                for (var i = 0; i < _this.list_item.length; i++) {
                    _this.tongtien = _this.tongtien + (_this.list_item[i].productDetail.giaBan * _this.list_item[i].soLuong);
                    _this.tongThanhToan = _this.tongtien + 25000;
                }
                _this.cartService.DeleteProduct(item.productDeatail);
            });
        });
    };
    CheckoutComponent.prototype.ngOnInit = function () {
    };
    CheckoutComponent.prototype.maGiamGia = function () {
        var _this = this;
        if (localStorage.getItem("products") === null) {
            sweetalert2_1["default"].fire("Giỏ hàng trống.", '', 'warning').then(function () {
            });
        }
        else {
            this.check = this.list_MGG.filter(function (d) { return d.code == _this.MaGiamGia; })[0];
            this.check_sudung = this.list_MGGSD.filter(function (d) { return d == _this.MaGiamGia; })[0];
            if (this.check != null && this.check_sudung == null) {
                this.list_MGGSD.push(this.MaGiamGia);
                this.tongThanhToan = this.tongtien + 25000 - this.check.soTienGiam;
                sweetalert2_1["default"].fire("Áp dụng mã giảm giá thành công .", '', 'success');
            }
            else {
                if (this.check_sudung == this.MaGiamGia) {
                    sweetalert2_1["default"].fire("Bạn đã áp mã này rồi.", '', 'error');
                }
                else {
                    sweetalert2_1["default"].fire("Mã giảm giá không tồn tại .", '', 'error');
                }
            }
        }
    };
    CheckoutComponent.prototype.onSubmit = function () {
        if (localStorage.getItem("products") === null) {
            sweetalert2_1["default"].fire("Giỏ hàng trống.", '', 'warning').then(function () {
            });
        }
        else {
            var clicks = localStorage.getItem('idUser');
            this.http.post(environment.URL_API+"hoadons/", {
                Tinh: this.Tinh,
                Huyen: this.Huyen,
                Xa: this.Xa,
                DiaChi: this.DiaChi,
                TongTien: this.tongThanhToan - 25000,
                Id_User: clicks
            }).subscribe(function (res) {
                sweetalert2_1["default"].fire("Đặt hàng thành công.", '', 'success').then(function () {
                    window.location.href = '/history';
                    localStorage.removeItem('products');
                });
            });
        }
    };
    CheckoutComponent.prototype.ChangeSoLuong = function (cartID, i) {
        var _this = this;
        var clicks = localStorage.getItem('idUser');
        this.http.post(environment.URL_API+"Carts/update/", {
            CartID: cartID,
            SoLuong: this.soLuong,
            UserID: clicks
        }).subscribe(function (res) {
            _this.list_item = res;
            _this.tongtien = 0;
            for (var i_1 = 0; i_1 < _this.list_item.length; i_1++) {
                _this.tongtien = _this.tongtien + (_this.list_item[i_1].productDetail.giaBan * _this.list_item[i_1].soLuong);
                _this.tongThanhToan = _this.tongtien + 25000;
            }
        });
        this.tongThanhToan = this.tongtien + 25000 - this.check.soTienGiam;
    };
    CheckoutComponent.prototype.updateCongSanPham = function (cartID, soLuong) {
        var _this = this;
        var clicks = localStorage.getItem('idUser');
        this.http.post(environment.URL_API+"Carts/update/", {
            CartID: cartID,
            SoLuong: soLuong + 1,
            UserID: clicks
        }).subscribe(function (res) {
            _this.list_item = res;
            _this.tongtien = 0;
            for (var i = 0; i < _this.list_item.length; i++) {
                _this.tongtien = _this.tongtien + (_this.list_item[i].productDetail.giaBan * _this.list_item[i].soLuong);
                _this.tongThanhToan = _this.tongtien + 25000;
            }
        });
        this.tongThanhToan = this.tongtien + 25000 - this.check.soTienGiam;
    };
    CheckoutComponent.prototype.updateTruSanPham = function (cartID, soLuong) {
        var _this = this;
        var clicks = localStorage.getItem('idUser');
        if (soLuong == 1) {
            soLuong = 0;
        }
        else {
            soLuong = soLuong - 1;
        }
        this.http.post(environment.URL_API+"Carts/update/", {
            CartID: cartID,
            SoLuong: soLuong,
            UserID: clicks
        }).subscribe(function (res) {
            _this.list_item = res;
            _this.tongtien = 0;
            for (var i = 0; i < _this.list_item.length; i++) {
                _this.tongtien = _this.tongtien + (_this.list_item[i].productDetail.giaBan * _this.list_item[i].soLuong);
                _this.tongThanhToan = _this.tongtien + 25000;
            }
        });
        this.tongThanhToan = this.tongtien + 25000 - this.check.soTienGiam;
    };
    CheckoutComponent.prototype.changTinhThanh = function (event) {
        this.Tinh = event;
        var tinh = event;
        var search = this.list_tinh_thanh.filter(function (d) { return d.name === tinh; })[0];
        this.list_quan_huyen = search.districts;
    };
    CheckoutComponent.prototype.changHuyenQuan = function (event) {
        this.Huyen = event;
        var Huyen = event;
        var search = this.list_quan_huyen.filter(function (d) { return d.name === Huyen; })[0];
        this.list_xa_phuong = search.wards;
    };
    CheckoutComponent = __decorate([
        core_1.Component({
            selector: 'app-checkout',
            templateUrl: './checkout.component.html',
            styleUrls: ['./checkout.component.scss']
        })
    ], CheckoutComponent);
    return CheckoutComponent;
}());
exports.CheckoutComponent = CheckoutComponent;
var deleteProduct = /** @class */ (function () {
    function deleteProduct() {
    }
    return deleteProduct;
}());
exports.deleteProduct = deleteProduct;
