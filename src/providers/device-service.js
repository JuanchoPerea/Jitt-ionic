var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//observable
import { ConfigData } from './config-data';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
var DeviceService = /** @class */ (function () {
    function DeviceService(http, configData) {
        this.http = http;
        this.configData = configData;
    }
    DeviceService.prototype.showAllDevice = function () {
        var route = this.configData.rutabase + "Devices/";
        return this.http.get(route);
    };
    DeviceService.prototype.showDevice = function (device_id) {
        var route = this.configData.rutabase + "Devices/" + device_id;
        return this.http.get(route);
    };
    DeviceService.prototype.addDevice = function (body) {
        console.log(body);
        var route = this.configData.rutabase + "Device";
        console.log(route);
        return this.http.post(route, body);
    };
    DeviceService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            ConfigData])
    ], DeviceService);
    return DeviceService;
}());
export { DeviceService };
//# sourceMappingURL=device-service.js.map