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
import { IonicPage, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//pipe
import { NoticesService } from '../../providers/notices-service';
import { LanguageProvider } from '../../providers/language/language';
/**
 * Generated class for the NoticesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NoticesPage = /** @class */ (function () {
    function NoticesPage(navParams, alertCtrl, loadingCtrl, noticesService, language, storage) {
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.noticesService = noticesService;
        this.language = language;
        this.storage = storage;
        this.asignature = {
            id: Number,
            siteId: String
        };
        this.title = "";
        this.listadoTitle = "";
        this.groups = [];
        this.asignature = this.navParams.get('asignature');
    }
    NoticesPage.prototype.ionViewWillEnter = function () {
        console.log('ionViewDidLoad NoticesPage');
        this.getGrupos();
        this.showLanguage();
        this.showListAvisos();
        this.presentLoadingCustom();
    };
    //funcion para la validacion
    NoticesPage.prototype.showListAvisos = function () {
        var _this = this;
        this.noticesService.getNotices(this.asignature.id).subscribe(function (data) {
            console.log(data);
            _this.avisos = JSON.parse(data['_body']);
        }, function (error) {
            console.error(error);
        });
        //this.avisos=this.noticesService.notices;
        console.log(this.avisos);
        //this.avisos=this.noticesService.notices;
    };
    NoticesPage.prototype.showAviso = function (aviso) {
        var alert = this.alertCtrl.create({
            title: aviso.title,
            message: aviso.message,
            buttons: ['OK']
        });
        //console.log('avisoId',this.aviso.id);
        alert.present();
    };
    NoticesPage.prototype.getGrupos = function () {
        var _this = this;
        this.storage.ready().then(function () {
            _this.storage.get("grupos")
                .then(function (data) {
                _this.groups = data;
            });
        });
    };
    NoticesPage.prototype.showLanguage = function () {
        var _this = this;
        //comprobamos si existe el logueo, sino redirigimos
        this.storage.ready().then(function () {
            _this.storage.get("language")
                .then(function (data) {
                _this.language.showLanguage(data, 'NoticesPage').subscribe(function (data) {
                    //console.log('datos: '+data)
                    //let texto=JSON.parse(data['_body']);
                    _this.title = data.text;
                    _this.listadoTitle = data.hijos[0].text;
                }, function (error) {
                    console.error(error);
                });
            });
        });
    };
    //loading
    NoticesPage.prototype.presentLoadingCustom = function () {
        var loading = this.loadingCtrl.create({
            spinner: '',
            content: "\n      <ion-spinner icon=\"bubbles\" class=\"spinner-balanced\"></ion-spinner>",
            duration: 1000
        });
        loading.onDidDismiss(function () {
            console.log('Dismissed loading');
        });
        loading.present();
    };
    //refresh
    NoticesPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('Begin async operation', refresher);
        setTimeout(function () {
            _this.getGrupos();
            _this.showLanguage();
            _this.showListAvisos();
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    NoticesPage = __decorate([
        IonicPage({
            segment: 'notices'
        }),
        Component({
            selector: 'page-notices',
            templateUrl: 'notices.html',
        }),
        __metadata("design:paramtypes", [NavParams,
            AlertController,
            LoadingController,
            NoticesService,
            LanguageProvider,
            Storage])
    ], NoticesPage);
    return NoticesPage;
}());
export { NoticesPage };
//# sourceMappingURL=notices.js.map