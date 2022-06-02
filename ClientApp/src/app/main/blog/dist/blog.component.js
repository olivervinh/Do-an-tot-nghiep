"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BlogComponent = void 0;
var core_1 = require("@angular/core");
var BlogComponent = /** @class */ (function () {
    function BlogComponent(http) {
        var _this = this;
        this.http = http;
        this.http.post(environment.URL_API+"blogs/getBlog/", {}).subscribe(function (res) {
            _this.listblog = res;
        });
    }
    BlogComponent.prototype.ngOnInit = function () {
    };
    BlogComponent = __decorate([
        core_1.Component({
            selector: 'app-blog',
            templateUrl: './blog.component.html',
            styleUrls: ['./blog.component.scss']
        })
    ], BlogComponent);
    return BlogComponent;
}());
exports.BlogComponent = BlogComponent;
