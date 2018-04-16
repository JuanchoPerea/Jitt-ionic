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
var DeviceSiteService = /** @class */ (function () {
    function DeviceSiteService(http, configData) {
        this.http = http;
        this.configData = configData;
    }
    DeviceSiteService.prototype.showAllDevicesBySite = function (siteId) {
        var route = this.configData.rutabase + siteId + "DeviceSites";
        return this.http.get(route);
    };
    DeviceSiteService.prototype.addDeviceSite = function (body) {
        console.log(body);
        var route = this.configData.rutabase + "DeviceSites";
        console.log(route);
        return this.http.post(route, body);
    };
    DeviceSiteService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            ConfigData])
    ], DeviceSiteService);
    return DeviceSiteService;
}());
export { DeviceSiteService };
//# sourceMappingURL=deviceSite-service.js.map