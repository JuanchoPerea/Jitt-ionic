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
  Generated class for the LanguageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var LanguageProvider = /** @class */ (function () {
    function LanguageProvider(http, configData) {
        this.http = http;
        this.configData = configData;
    }
    LanguageProvider.prototype.showLanguage = function (language, page) {
        var route = this.configData.rutabase + language + "/" + page;
        return this.http.get(route).map(function (res) { return res.json(); }).share();
    };
    LanguageProvider.prototype.showLanguages = function () {
        var route = this.configData.rutabase + "languages";
        console.log(route);
        return this.http.get(route).map(function (res) { return res.json(); }).share();
    };
    LanguageProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            ConfigData])
    ], LanguageProvider);
    return LanguageProvider;
}());
export { LanguageProvider };
//# sourceMappingURL=language.js.map