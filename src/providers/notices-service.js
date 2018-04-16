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
//servicios
import { ConfigData } from './config-data';
//observable
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
var NoticesService = /** @class */ (function () {
    function NoticesService(http, configData) {
        this.http = http;
        this.configData = configData;
    }
    NoticesService.prototype.getNotices = function (siteId) {
        var route = this.configData.rutabase + siteId + "/Notices";
        return this.http.get(route);
    };
    NoticesService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            ConfigData])
    ], NoticesService);
    return NoticesService;
}());
export { NoticesService };
//# sourceMappingURL=notices-service.js.map