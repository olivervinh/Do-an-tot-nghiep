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
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var base_service_1 = require("src/app/service/base.service");
var sweetalert2_1 = require("sweetalert2");
var RegisterComponent = /** @class */ (function (_super) {
    __extends(RegisterComponent, _super);
    function RegisterComponent(http, router, _formBuilder) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.router = router;
        _this._formBuilder = _formBuilder;
        _this.hide = true;
        _this.register = {};
        _this._unsubscribeAll = new rxjs_1.Subject();
        return _this;
    }
    RegisterComponent.prototype.check = function () {
        if (this.userFormGroup.value.Password != this.userFormGroup.value.RePassword) {
            sweetalert2_1["default"].fire("Mật khẩu không trùng nhau", '', 'warning').then(function () {
            });
        }
        else {
            this.registerAccount();
        }
    };
    RegisterComponent.prototype.registerAccount = function () {
        this.http.post(environment.URL_API+"auth/registerCustomer", {
            data: this.userFormGroup.value
        }).subscribe(function (resp) {
            sweetalert2_1["default"].fire("Đăng ký thành công", ' ', 'success').then(function () {
                // this.router.navigate(['/login']);
                window.location.href = '/login';
            });
        });
    };
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userFormGroup = this._formBuilder.group({
            FirstName: ['', [forms_1.Validators.required]],
            LastName: ['', forms_1.Validators.required],
            Email: ['', forms_1.Validators.required],
            SDT: ['', forms_1.Validators.required],
            DiaChi: ['', forms_1.Validators.required],
            Password: ['', forms_1.Validators.required],
            RePassword: ['', forms_1.Validators.required]
        });
        this.userFormGroup.get('Password').valueChanges
            .pipe(operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function () {
            _this.userFormGroup.get('RePassword').updateValueAndValidity();
        });
    };
    RegisterComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.scss']
        })
    ], RegisterComponent);
    return RegisterComponent;
}(base_service_1.BaseService));
exports.RegisterComponent = RegisterComponent;
