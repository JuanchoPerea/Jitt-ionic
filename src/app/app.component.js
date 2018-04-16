var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController, Events } from 'ionic-angular';
//import { Platform ,NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//providers
import { AsignaturesService } from '../providers/asignatures-server';
import { LoginService } from '../providers/login-server';
import { DeviceSiteService } from '../providers/deviceSite-service';
//import {DeviceService} from '../providers/device-service';
import { LanguageProvider } from '../providers/language/language';
//page
//import { TabsPage } from '../pages/tabs-page/tabs-page';
import { LoginPage } from '../pages/login/login';
import { RewardsPage } from '../pages/rewards/rewards';
import { NoticesPage } from '../pages/notices/notices';
import { PollsPage } from '../pages/polls/polls';
import { QuizsPage } from '../pages/quizs/quizs';
//storage
import { Storage } from '@ionic/storage';
var MyApp = /** @class */ (function () {
    function MyApp(
    //public nav:NavController,
    events, menuCtrl, storage, platform, statusBar, asignaturesService, loginService, splashScreen, 
    //public notification:NotificationProvider,
    //public device:DeviceService,
    deviceSite, language) {
        this.events = events;
        this.menuCtrl = menuCtrl;
        this.storage = storage;
        this.platform = platform;
        this.statusBar = statusBar;
        this.asignaturesService = asignaturesService;
        this.loginService = loginService;
        this.splashScreen = splashScreen;
        this.deviceSite = deviceSite;
        this.language = language;
        this.login = false;
        this.selectasig = {};
        this.asignature = {};
        this.languageSelect = 1;
        this.encabezado = "";
        //asignamos paginas para menu lateral
        /*if(Titulos){
            appPages: PageInterface[] = [
          
          { title: Titulos[0].text, name: 'NoticesPage', component: NoticesPage, tabComponent: NoticesPage, icon: 'alarm' },
          { title: Titulos[1].text, name: 'QuizsPage', component: QuizsPage, tabComponent: QuizsPage, icon: 'paper' },
          { title: Titulos[2].text, name: 'PollsPage', component: PollsPage, tabComponent: PollsPage, icon: 'list-box' },
          ];
        }else{
      
          appPages: PageInterface[] = [
          
          { title: 'Avisos', name: 'NoticesPage', component: NoticesPage, tabComponent: NoticesPage, icon: 'alarm' },
          { title: 'Cuestionarios', name: 'QuizsPage', component: QuizsPage, tabComponent: QuizsPage, icon: 'paper' },
          { title: 'Encuestas', name: 'PollsPage', component: PollsPage, tabComponent: PollsPage, icon: 'list-box' },
          
      
          ];
        }*/
        this.appPages = [
            /*{ title: 'Recompensas', name: 'RewardsPage', component: RewardsPage, tabComponent: RewardsPage, icon: 'trophy' },*/
            { title: 'Avisos', name: 'NoticesPage', component: NoticesPage, tabComponent: NoticesPage, icon: 'alarm' },
            { title: 'Cuestionarios', name: 'QuizsPage', component: QuizsPage, tabComponent: QuizsPage, icon: 'paper' },
            { title: 'Encuestas', name: 'PollsPage', component: PollsPage, tabComponent: PollsPage, icon: 'list-box' },
        ];
        this.loggedInPages = [
            { title: 'Logout', name: 'Logout', component: NoticesPage, icon: 'log-out' }
        ];
        this.loggedOutPages = [
            { title: 'Login', name: 'LoginPage', component: NoticesPage, icon: 'log-in' },
        ];
        this.listenToLoginEvents();
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            //this.pushProvider.init_notifications();
            //notificaciones
            //registro dispositov
            //this.notification.init_notifications();
        });
        this.checkingInitial();
        this.asignatures = this.asignaturesService.asignatures;
        if (asignaturesService.asignatures) {
            this.asignature = this.asignaturesService.asignatures[0];
            this.selectasig = this.asignature;
        }
        this.showLanguage();
        console.log(this.asignature);
        console.log(this.selectasig);
    }
    MyApp.prototype.listenToLoginEvents = function () {
        var _this = this;
        this.events.subscribe('language: change', function () {
            _this.showLanguage();
        });
        this.events.subscribe('asignature:select', function () {
            _this.showLanguage();
        });
    };
    // notificaciones 
    //fin notificaciones
    //esta funcion nos comprueba si hay datos en local y los carga en las 
    //variables correspondientes
    MyApp.prototype.checkingInitial = function () {
        var _this = this;
        //comprobamos si existe el logueo, sino redirigimos
        this.storage.ready().then(function () {
            _this.storage.get("login")
                .then(function (data) {
                if (data) {
                    console.log(data);
                    _this.users = data;
                    _this.loginService.user = data;
                    _this.storage.ready().then(function () {
                        _this.storage.get("asignatures").then(function (data) {
                            if (data) {
                                console.log(data);
                                _this.asignatures = data;
                                console.log(_this.asignatures + ' y ' + _this.users);
                                //this.notification.init_notifications(this.asignatures,this.users);
                                console.log('data local');
                                if (_this.asignatures['id'] != 0) {
                                    console.log('otro');
                                    _this.selectasig = data[0];
                                    _this.asignature = data[0];
                                    _this.storage.ready().then(function () {
                                        _this.storage.get("asignature").then(function (data) {
                                            //console.log(data);
                                            if (data) {
                                                _this.asignature = data;
                                                _this.selectasig = data;
                                            }
                                        });
                                    });
                                    //registro dispositov antes de redirigir y ya logueado
                                    _this.rootPage = RewardsPage;
                                }
                                else {
                                    _this.asignatures = _this.asignaturesService.asignatures;
                                }
                                //antes
                                //console.log(this.asignatures); 
                                //this.notification.init_notifications(this.asignatures,this.users);
                            }
                        });
                    });
                }
                else {
                    _this.rootPage = LoginPage;
                }
                _this.login = true;
            });
        });
    };
    MyApp.prototype.showLanguage = function () {
        var _this = this;
        //comprobamos si existe el logueo, sino redirigimos
        this.storage.ready().then(function () {
            _this.storage.get("language")
                .then(function (data) {
                _this.language.showLanguage(data, 'App').subscribe(function (data) {
                    _this.languageSelect = data;
                    //console.log('datos: '+data)
                    //let texto=JSON.parse(data['_body']);
                    //this.title=data.text;
                    _this.encabezado = data.text;
                    _this.appPages = [
                        { title: data.hijos[0].text, name: 'NoticesPage', component: NoticesPage, tabComponent: NoticesPage, icon: 'alarm' },
                        { title: data.hijos[1].text, name: 'QuizsPage', component: QuizsPage, tabComponent: QuizsPage, icon: 'paper' },
                        { title: data.hijos[2].text, name: 'PollsPage', component: PollsPage, tabComponent: PollsPage, icon: 'list-box' },
                    ];
                }, function (error) {
                    console.error(error);
                });
            });
        });
    };
    MyApp.prototype.selectAsignatura = function (asignature) {
        this.saveLocalasignature(asignature);
        this.selectasig = asignature;
        this.nav.resize();
        console.log(asignature);
        //registramos dispositivo en la asignatura
        /*let body={
          device_id=this.notification.device_id
   
        }
   
        //this.deviceSite.addDeviceSite(body);*/
        //redireccionamos a la pagina de recompensas
        this.nav.setRoot(RewardsPage, { asignature: asignature });
        this.menuCtrl.close();
    };
    MyApp.prototype.saveLocalasignature = function (asignature) {
        this.storage.set('asignature', asignature);
    };
    MyApp.prototype.openPage = function (page) {
        var asignature = this.asignature;
        if (page === 'Logout') {
            //console.log(page);
            this.loginService.logout();
            this.nav.setRoot(LoginPage);
        }
        else {
            //console.log('resto');
            this.nav.setRoot(page, { asignature: asignature });
        }
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Events,
            MenuController,
            Storage,
            Platform,
            StatusBar,
            AsignaturesService,
            LoginService,
            SplashScreen,
            DeviceSiteService,
            LanguageProvider])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map