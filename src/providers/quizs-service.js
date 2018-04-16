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
var QuizsService = /** @class */ (function () {
    function QuizsService(http, configData) {
        this.http = http;
        this.configData = configData;
    }
    QuizsService.prototype.showAllQuizs = function (siteId, user_id) {
        var route = this.configData.rutabase + siteId + "/Quizs/" + user_id;
        return this.http.get(route);
    };
    QuizsService.prototype.showAllQuizQuestion = function (quiz_id) {
        var route = this.configData.rutabase + "Quizs/" + quiz_id + "/Questions";
        return this.http.get(route);
    };
    QuizsService.prototype.showAllQuizQuestionOptions = function (quiz_id, quiz_question_id) {
        var route = this.configData.rutabase + "Quizs/" + quiz_id + "/Questions/" + quiz_question_id + "/Options";
        return this.http.get(route);
    };
    QuizsService.prototype.showAllQuizQuestionOptionVoted = function () {
    };
    QuizsService.prototype.addQuizVoted = function (body) {
        var route = this.configData.rutabase + "Quizs/OptionVoted";
        return this.http.post(route, body);
    };
    QuizsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            ConfigData])
    ], QuizsService);
    return QuizsService;
}());
export { QuizsService };
//# sourceMappingURL=quizs-service.js.map