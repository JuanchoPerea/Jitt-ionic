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
import { IonicPage, App, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//service
import { RewardsService } from '../../providers/rewards-service';
import { LoginService } from '../../providers/login-server';
import { AsignaturesService } from '../../providers/asignatures-server';
import { LanguageProvider } from '../../providers/language/language';
import { GroupProvider } from '../../providers/group/group';
import { NotificationProvider } from '../../providers/notification/notification';
/**
 * Generated class for the RewardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RewardsPage = /** @class */ (function () {
    function RewardsPage(navCtrl, navParams, loadingCtrl, rewardsService, loginService, asignaturesService, language, group, notification, app, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.rewardsService = rewardsService;
        this.loginService = loginService;
        this.asignaturesService = asignaturesService;
        this.language = language;
        this.group = group;
        this.notification = notification;
        this.app = app;
        this.storage = storage;
        this.selectasig = [];
        this.asignature = [];
        this.asignatures = [];
        this.resultados = [];
        this.recompensas = [];
        this.users = [];
        this.login = false;
        this.subtitles = [];
        this.progreso = "";
        this.groups = [];
        //cargamos al inicio de la pagina
        this.checkingInitial();
        //this.textos=JSON.parse(this.showLanguage(1));
        //console.log(this.language.showLanguage(1,'RewardPage'));
        if (this.navParams.get('asignature')) {
            this.asignature = this.navParams.get('asignature');
        }
        this.selectasig = this.asignature;
        this.showAllRewards(this.asignature['id']);
        this.showAllResultados();
        this.showLanguage();
        this.presentLoadingCustom();
        //console.log('fuera: '+this.textos);
    }
    RewardsPage.prototype.ionViewDidLoad = function () {
        //console.log(this.asignature['id']);
        //
        console.log('ionViewDidLoad RewardsPage');
    };
    //carga de los resultados de los cuestionarios
    RewardsPage.prototype.showAllResultados = function () {
        //console.log('estoy aqui');
        this.resultados = this.rewardsService.showAllResultados();
        this.progress = parseInt(this.resultados[0].count);
        this.progress += parseInt(this.resultados[1].count);
        var flotante = this.progress / this.resultados[3].count;
        this.resultfinal = Math.round(flotante * 100);
    };
    //carga de las recompensas
    RewardsPage.prototype.showAllRewards = function (siteId) {
        var _this = this;
        this.rewardsService.showAllRewards(siteId).subscribe(function (data) {
            //console.log(data);
            _this.recompensas = JSON.parse(data['_body']);
        }, function (error) {
            console.error(error);
        });
    };
    //carga idioma
    RewardsPage.prototype.showLanguage = function () {
        var _this = this;
        //comprobamos si existe el logueo, sino redirigimos
        this.storage.ready().then(function () {
            _this.storage.get("language")
                .then(function (data) {
                _this.language.showLanguage(data, 'RewardPage').subscribe(function (data) {
                    //console.log('datos: '+data)
                    //let texto=JSON.parse(data['_body']);
                    _this.title = data.text;
                    var objs = data.hijos;
                    //var cont=0;
                    objs.forEach(function (item) {
                        _this.subtitles.push(item.text);
                        if (item.description == "Titulo Seccion Reward Point") {
                            _this.progreso = item.hijos[0].text;
                            _this.resultados[0].title = item.hijos[1].text;
                            _this.resultados[1].title = item.hijos[2].text;
                            _this.resultados[2].title = item.hijos[3].text;
                            _this.resultados[3].title = item.hijos[4].text;
                            //console.log(item.hijos[0].text);
                        }
                    });
                }, function (error) {
                    console.error(error);
                });
            });
        });
    };
    //cargamos los datos del usuario y la asignaturas
    RewardsPage.prototype.checkingInitial = function () {
        var _this = this;
        //comprobamos si existe el logueo, sino redirigimos
        this.storage.ready().then(function () {
            _this.storage.get("login")
                .then(function (data) {
                if (data) {
                    _this.users = data;
                    _this.getGroupsUser(_this.asignature['id'], _this.users);
                    _this.loginService.user = data;
                    _this.storage.ready().then(function () {
                        _this.storage.get("asignatures").then(function (data) {
                            if (data) {
                                //console.log(data);
                                _this.asignatures = data;
                                console.log(_this.users);
                                console.log(_this.asignatures);
                                _this.notification.init_notifications(_this.asignatures, _this.users);
                                _this.selectasig = data[0];
                                _this.asignature = data[0];
                            }
                        });
                    });
                    //console.log(this.selectasig);
                    //this.rootPage = TabsPage;
                }
            });
        });
    };
    //get groups user
    RewardsPage.prototype.getGroupsUser = function (id_site, id_user) {
        var _this = this;
        this.group.getGroups(id_site, id_user['id']).subscribe(function (grupos) {
            console.log(grupos);
            if (grupos[0]) {
                for (var i = 0; i < grupos[0].length; i++) {
                    _this.groups.push(grupos[0][i].id);
                }
            }
            else {
                _this.groups.push(0);
            }
            _this.storage.set("grupos", _this.groups);
        }, function (error) {
            console.error(error);
        });
    };
    //loading
    RewardsPage.prototype.presentLoadingCustom = function () {
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
    RewardsPage = __decorate([
        IonicPage({
            segment: 'rewards'
        }),
        Component({
            selector: 'page-rewards',
            templateUrl: 'rewards.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            LoadingController,
            RewardsService,
            LoginService,
            AsignaturesService,
            LanguageProvider,
            GroupProvider,
            NotificationProvider,
            App,
            Storage])
    ], RewardsPage);
    return RewardsPage;
}());
export { RewardsPage };
//# sourceMappingURL=rewards.js.map