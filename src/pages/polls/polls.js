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
import { PollsService } from '../../providers/polls-service';
import { LoginService } from '../../providers/login-server';
import { LanguageProvider } from '../../providers/language/language';
//page
import { PollPage } from '../poll/poll';
/**
 * Generated class for the PollsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PollsPage = /** @class */ (function () {
    function PollsPage(storage, navCtrl, navParams, loadingCtrl, events, pollsService, loginService, language) {
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.pollsService = pollsService;
        this.loginService = loginService;
        this.language = language;
        this.user_id = '';
        this.pendientes = [];
        this.votadas = [];
        this.encuestas = [];
        this.asignature = {
            id: Number,
            siteId: String
        };
        this.listvote = [];
        this.subtitle = '';
        this.title = {};
        this.button = [];
        this.groups = [];
        this.presentLoadingCustom();
    }
    PollsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PollsPage');
        console.log(this.encuestas);
        this.listenToLoginEvents();
        //this.getAllVotedbyUser('47289462j');
    };
    //para refrescar la vista cuando vuelvo de la poll
    PollsPage.prototype.listenToLoginEvents = function () {
        var _this = this;
        this.events.subscribe('poll: envio', function (data) {
            _this.presentLoadingCustom();
        });
    };
    PollsPage.prototype.showAllPolls = function (asignature, user_id) {
        var _this = this;
        this.pollsService.showAllPolls(asignature, user_id).subscribe(function (data) {
            console.log(data);
            _this.encuestas = JSON.parse(data['_body']);
        }, function (error) {
            console.error(error);
        });
    };
    PollsPage.prototype.getAllVotedbyUser = function (user_id) {
        var _this = this;
        this.pollsService.findAllPollsVotedByUser(user_id)
            .subscribe(function (data) {
            _this.listvote = JSON.parse(data['_body']);
            console.log(_this.listvote);
            _this.encuestas.forEach(function (poll) {
                _this.listvote.forEach(function (item) {
                    console.log(poll);
                    console.log(item);
                    if (poll['id'] == item['poll_id']) {
                        _this.encuestas['voted'] = true;
                    }
                    else {
                        _this.encuestas['voted'] = false;
                    }
                });
            });
            console.log(_this.encuestas);
        }, function (error) {
            console.error(error);
        });
    };
    PollsPage.prototype.showEncuesta = function (encuesta) {
        this.navCtrl.push(PollPage, { encuesta: encuesta });
    };
    PollsPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('Begin async operation', refresher);
        setTimeout(function () {
            _this.asignature = _this.navParams.get('asignature');
            _this.user_id = _this.loginService.user['id'];
            _this.showAllPolls(_this.asignature.id, _this.user_id);
            _this.getGrupos();
            _this.showLanguage();
            _this.presentLoadingCustom();
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    PollsPage.prototype.showLanguage = function () {
        var _this = this;
        //comprobamos si existe el logueo, sino redirigimos
        this.storage.ready().then(function () {
            _this.storage.get("language")
                .then(function (data) {
                _this.language.showLanguage(data, 'PollsPage').subscribe(function (data) {
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
    PollsPage.prototype.getGrupos = function () {
        var _this = this;
        this.storage.ready().then(function () {
            _this.storage.get("grupos")
                .then(function (data) {
                _this.groups = data;
            });
        });
    };
    //loading
    PollsPage.prototype.presentLoadingCustom = function () {
        var loading = this.loadingCtrl.create({
            spinner: '',
            content: "\n        <ion-spinner icon=\"bubbles\" class=\"spinner-balanced\"></ion-spinner>",
            duration: 1000
        });
        this.asignature = this.navParams.get('asignature');
        this.user_id = this.loginService.user['id'];
        this.showAllPolls(this.asignature.id, this.user_id);
        this.getGrupos();
        this.showLanguage();
        this.listenToLoginEvents();
        loading.onDidDismiss(function () {
            console.log('Dismissed loading');
        });
        loading.present();
    };
    PollsPage = __decorate([
        IonicPage({
            segment: 'polls'
        }),
        Component({
            selector: 'page-polls',
            templateUrl: 'polls.html',
        }),
        __metadata("design:paramtypes", [Storage,
            NavController,
            NavParams,
            LoadingController,
            Events,
            PollsService,
            LoginService,
            LanguageProvider])
    ], PollsPage);
    return PollsPage;
}());
export { PollsPage };
//# sourceMappingURL=polls.js.map