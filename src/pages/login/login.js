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
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
//servico
import { LoginService } from '../../providers/login-server';
import { LanguageProvider } from '../../providers/language/language';
import { AsignaturesService } from '../../providers/asignatures-server';
import { Storage } from '@ionic/storage';
//notificaciones
import { NotificationProvider } from '../../providers/notification/notification';
//page
//import { AsignaturesPage } from '../asignatures/asignatures';
import { RewardsPage } from '../rewards/rewards';
var LoginPage = /** @class */ (function () {
    function LoginPage(events, navCtrl, navParams, loginService, local, notification, asignaturesService, language) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loginService = loginService;
        this.local = local;
        this.notification = notification;
        this.asignaturesService = asignaturesService;
        this.language = language;
        this.submitted = false;
        this.users = [];
        this.asignatures = [];
        this.languages = [];
        this.languageSelect = 1;
        this.showLanguages();
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        //console.log(this.asignature['id']);
        //
        console.log('ionViewDidLoad LoginPage');
        this.showLanguages();
    };
    //llamada al controlador para login
    LoginPage.prototype.login = function (form) {
        var _this = this;
        //obtenemos key del usuario(logueo) 
        this.loginService.loadFromServer(form.value.username, form.value.password)
            .subscribe(function (result) {
            _this.users = result;
            console.log(_this.users[0]);
            _this.loginService.user = _this.users[0];
            _this.local.set('login', _this.users[0]);
            _this.asignatures = _this.asignaturesService.asignatures;
            //guardado en local 
            if (_this.asignatures[0].siteTitle != 'error' || '') {
                console.log(_this.asignatures);
                _this.local.set('asignatures', _this.asignatures);
                _this.local.set('asignature', _this.asignatures[0]);
                _this.navCtrl.setRoot(RewardsPage, { asignature: _this.asignatures[0] });
            }
            else {
                console.log('error en data local');
                _this.asignaturesService.getFromServer(_this.users[0]['key']);
                _this.asignatures = _this.asignaturesService.asignatures;
                _this.local.set('asignatures', _this.asignatures);
                _this.local.set('asignature', _this.asignatures[0]);
                _this.events.publish('asignature: select', { asignature: _this.asignatures[0] });
                _this.navCtrl.setRoot(RewardsPage, { asignature: _this.asignatures[0] });
            }
            _this.local.set('language', _this.languageSelect);
            //this.notification.init_notifications(this.asignatures,form.value.username);
        }, function (error) {
            console.log('Error loading users from server', error);
        });
    };
    LoginPage.prototype.showLanguages = function () {
        var _this = this;
        this.language.showLanguages()
            .subscribe(function (languages) {
            console.log(languages);
            _this.languages = languages;
        });
    };
    LoginPage.prototype.selectLanguage = function (languageSelect) {
        this.local.set('language', languageSelect);
        this.events.publish('language: change', { language: languageSelect });
    };
    LoginPage = __decorate([
        IonicPage({
            name: 'login',
            segment: 'login'
        }),
        Component({
            selector: 'page-user',
            templateUrl: 'login.html'
        }),
        __metadata("design:paramtypes", [Events,
            NavController,
            NavParams,
            LoginService,
            Storage,
            NotificationProvider,
            AsignaturesService,
            LanguageProvider])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map