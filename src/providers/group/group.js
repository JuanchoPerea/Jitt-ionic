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
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
//servicios
import { ConfigData } from '../config-data';
/*
  Generated class for the GroupProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GroupProvider = /** @class */ (function () {
    function GroupProvider(http, configData) {
        this.http = http;
        this.configData = configData;
        console.log('Hello GroupProvider Provider');
    }
    GroupProvider.prototype.getGroups = function (id_site, id_user) {
        var route = this.configData.rutabase + id_site + '/Groups/' + id_user;
        console.log(route);
        return this.http.get(route).map(function (res) { return res.json(); }).share();
    };
    GroupProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, ConfigData])
    ], GroupProvider);
    return GroupProvider;
}());
export { GroupProvider };
//# sourceMappingURL=group.js.map