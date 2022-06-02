"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HistoryComponent = void 0;
var core_1 = require("@angular/core");
var signalR = require("@microsoft/signalr");
var HistoryComponent = /** @class */ (function () {
    function HistoryComponent(http, userService) {
        this.http = http;
        this.userService = userService;
        userService.checkLogin();
    }
    HistoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        var clicks = localStorage.getItem('idUser');
        this.http.post(environment.URL_API+"hoadons/danhsachhoadon/", {
            idUser: clicks
        }).subscribe(function (res) {
            _this.list_hoadon = res;
        });
        var connection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Information)
            .withUrl('https://localhost:44302/notify')
            .build();
        connection.start().then(function () {
            console.log('SignalR Connected!');
        })["catch"](function (err) {
            return console.error(err.toString());
        });
        connection.on("BroadcastMessage", function () {
            _this.http.post(environment.URL_API+"hoadons/danhsachhoadon/", {
                idUser: clicks
            }).subscribe(function (res) {
                _this.list_hoadon = res;
            });
        });
    };
    HistoryComponent = __decorate([
        core_1.Component({
            selector: 'app-contact',
            templateUrl: './history.component.html',
            styleUrls: ['./history.component.scss']
        })
    ], HistoryComponent);
    return HistoryComponent;
}());
exports.HistoryComponent = HistoryComponent;
