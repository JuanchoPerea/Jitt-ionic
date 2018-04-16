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
var RewardsService = /** @class */ (function () {
    function RewardsService(http, configData) {
        this.http = http;
        this.configData = configData;
    }
    RewardsService.prototype.showAllResultados = function () {
        var resultados = [
            {
                'title': 'correctas',
                'count': '7',
                'icon': 'happy'
            },
            {
                'title': 'incorrectas',
                'count': '3',
                'icon': 'sad'
            },
            {
                'title': 'pendientes',
                'count': '5',
                'icon': 'help-circle'
            },
            {
                'title': 'total',
                'count': '15',
                'icon': 'calculator'
            },
        ];
        return resultados;
    };
    RewardsService.prototype.showAllRewards = function (siteId) {
        var route = this.configData.rutabase + siteId + "/Rewards";
        return this.http.get(route);
    };
    RewardsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            ConfigData])
    ], RewardsService);
    return RewardsService;
}());
export { RewardsService };
//# sourceMappingURL=rewards-service.js.map