var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//servicio
import { QuizsService } from '../../providers/quizs-service';
import { LoginService } from '../../providers/login-server';
import { LanguageProvider } from '../../providers/language/language';
//page
import { QuizPage } from '../quiz/quiz';
/**
 * Generated class for the QuizsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var QuizsPage = /** @class */ (function () {
    function QuizsPage(navCtrl, navParams, loadingCtrl, events, quizsService, loginService, language, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.quizsService = quizsService;
        this.loginService = loginService;
        this.language = language;
        this.storage = storage;
        this.user_id = '';
        this.pendientes = [];
        this.votadas = [];
        this.quizs = [];
        this.asignature = [];
        this.title = "";
        this.subtitle = "";
        this.button = [];
        this.groups = [];
        this.presentLoadingCustom();
    }
    QuizsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad QuizsPage');
        this.listenToLoginEvents();
    };
    //refrescar cuando se vuelve de la vista 
    QuizsPage.prototype.listenToLoginEvents = function () {
        var _this = this;
        this.events.subscribe('quiz: envio', function (data) {
            _this.presentLoadingCustom();
        });
    };
    //para mostrar las Quizs
    QuizsPage.prototype.showAllQuizs = function (siteId, user_id) {
        var _this = this;
        return this.quizsService.showAllQuizs(siteId, user_id).subscribe(function (data) {
            _this.quizs = JSON.parse(data['_body']);
        }, function (error) {
            console.error(error);
        });
    };
    QuizsPage.prototype.showQuiz = function (quiz) {
        console.log(quiz);
        this.navCtrl.push(QuizPage, { quiz: quiz });
    };
    QuizsPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('Begin async operation', refresher);
        setTimeout(function () {
            _this.asignature = _this.navParams.get('asignature');
            _this.user_id = _this.loginService.user['id'];
            _this.showAllQuizs(_this.asignature['id'], _this.user_id);
            _this.getGrupos();
            _this.showLanguage();
            _this.presentLoadingCustom();
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    QuizsPage.prototype.showLanguage = function () {
        var _this = this;
        //comprobamos si existe el logueo, sino redirigimos
        this.storage.ready().then(function () {
            _this.storage.get("language")
                .then(function (data) {
                _this.language.showLanguage(data, 'QuizsPage').subscribe(function (data) {
                    //console.log('datos: '+data)
                    //let texto=JSON.parse(data['_body']);
                    _this.subtitle = data.hijos[0].text;
                    _this.title = data.text;
                    _this.button.push(data.hijos[0].hijos[0].text);
                    _this.button.push(data.hijos[0].hijos[1].text);
                }, function (error) {
                    console.error(error);
                });
            });
        });
    };
    //get groups groups
    QuizsPage.prototype.getGrupos = function () {
        var _this = this;
        this.storage.ready().then(function () {
            _this.storage.get("grupos")
                .then(function (data) {
                _this.groups = data;
            });
        });
    };
    //loading 
    QuizsPage.prototype.presentLoadingCustom = function () {
        var loading = this.loadingCtrl.create({
            spinner: '',
            content: "\n        <ion-spinner icon=\"bubbles\" class=\"spinner-balanced\"></ion-spinner>",
            duration: 1000
        });
        //datos que se cargaran al inicio
        console.log(this.loginService.user);
        this.asignature = this.navParams.get('asignature');
        this.user_id = this.loginService.user['id'];
        this.showAllQuizs(this.asignature['id'], this.user_id);
        this.getGrupos();
        this.showLanguage();
        this.listenToLoginEvents();
        loading.onDidDismiss(function () {
            console.log('Dismissed loading');
        });
        loading.present();
    };
    QuizsPage = __decorate([
        IonicPage({
            segment: 'quizs',
        }),
        Component({
            selector: 'page-quizs',
            templateUrl: 'quizs.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            LoadingController,
            Events,
            QuizsService,
            LoginService,
            LanguageProvider,
            Storage])
    ], QuizsPage);
    return QuizsPage;
}());
export { QuizsPage };
//# sourceMappingURL=quizs.js.map