"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var base_service_1 = require("./base.service");
var sweetalert2_1 = require("sweetalert2");
//import * as _ from 'lodash';
// Add the RxJS Observable operators we need in this app.
var UserService = /** @class */ (function (_super) {
    __extends(UserService, _super);
    function UserService(http, router) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.router = router;
        _this.baseUrl = '';
        // Observable navItem source
        _this._authNavStatusSource = new rxjs_1.BehaviorSubject(false);
        // Observable navItem stream
        _this.authNavStatus$ = _this._authNavStatusSource.asObservable();
        _this.loggedIn = false;
        _this.loggedIn = !!localStorage.getItem('auth_token');
        // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
        // header component resulting in authed user nav links disappearing despite the fact user is still logged in
        _this._authNavStatusSource.next(_this.loggedIn);
        _this.baseUrl = environment.URL_API+"";
        return _this;
    }
    UserService.prototype.login = function (userName, password) {
        var _this = this;
        var check = false;
        this.http.post(this.baseUrl + 'auth/login', JSON.stringify({ userName: userName, password: password }), { headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(function (res) {
            localStorage.setItem('auth_token', res.auth_token);
            localStorage.setItem('idUser', res.id);
            sweetalert2_1["default"].fire("Đăng nhập thành công .", '', 'success');
            window.location.href = "/";
            _this.loggedIn = true;
            check = true;
            _this._authNavStatusSource.next(true);
            var clicks = localStorage.getItem('idUser');
            _this.http.post(environment.URL_API+"Carts/getCart/" + clicks, {}).subscribe(function (res) {
                var list_item = res;
                localStorage.setItem('products', JSON.stringify(list_item));
            });
        }, function (error) {
            sweetalert2_1["default"].fire({
                title: 'Đăng nhập không thành công',
                text: "",
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Đóng'
            }).then(function (result) {
            }); //You can also throw the error to a global error handler
        });
        return check;
    };
    UserService.prototype.logout = function () {
        localStorage.removeItem('auth_token');
        this.router.navigate(['/login']);
        this.loggedIn = false;
        this._authNavStatusSource.next(false);
    };
    UserService.prototype.isLoggedIn = function () {
        return this.loggedIn;
    };
    UserService.prototype.checkLogin = function () {
        if (localStorage.getItem("idUser") != null || localStorage.getItem("auth_token") != null) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    };
    UserService = __decorate([
        core_1.Injectable()
    ], UserService);
    return UserService;
}(base_service_1.BaseService));
exports.UserService = UserService;
