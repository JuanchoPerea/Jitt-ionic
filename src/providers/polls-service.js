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
import { ConfigData } from './config-data';
var PollsService = /** @class */ (function () {
    function PollsService(http, configData) {
        this.http = http;
        this.configData = configData;
    }
    PollsService.prototype.showAllPolls = function (siteId, user_id) {
        var route = this.configData.rutabase + siteId + "/Polls/" + user_id;
        return this.http.get(route);
    };
    PollsService.prototype.showAllPollOption = function (poll_id) {
        var route = this.configData.rutabase + "Polls/" + poll_id + "/Options";
        return this.http.get(route);
    };
    PollsService.prototype.findAllPollsVoted = function (poll_id) {
        var route = this.configData.rutabase + "Polls/" + poll_id + "/OptionVoted";
        return this.http.get(route);
    };
    PollsService.prototype.findAllPollsVotedByUser = function (user_id) {
        var route = this.configData.rutabase + "OptionVoted/" + user_id;
        return this.http.get(route);
    };
    PollsService.prototype.addPollVoted = function (body) {
        var route = this.configData.rutabase + "OptionVoted";
        return this.http.post(route, body);
    };
    PollsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            ConfigData])
    ], PollsService);
    return PollsService;
}());
export { PollsService };
//# sourceMappingURL=polls-service.js.map