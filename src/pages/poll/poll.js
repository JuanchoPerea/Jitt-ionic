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
//servicio
import { PollsService } from '../../providers/polls-service';
import { LanguageProvider } from '../../providers/language/language';
//storage
import { Storage } from '@ionic/storage';
/**
 * Generated class for the PollPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PollPage = /** @class */ (function () {
    function PollPage(navCtrl, navParams, loadingCtrl, events, pollsService, language, local) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.pollsService = pollsService;
        this.language = language;
        this.local = local;
        this.user_id = '';
        this.optionvoted = [{
                user_id: String,
                poll_id: Number,
                poll_option_id: Number
            }];
        this.options = [];
        this.encuesta = [{
                id: Number,
                site_id: Number,
                creation: Date,
                title: String,
                message: String,
                state: String
            }];
        this.title = "";
        this.buttom = "";
        this.local.get("login").then(function (data) {
            if (data) {
                _this.user_id = data.id.toLowerCase();
            }
        });
        //this.getAllOptionVoted();
        this.presentLoadingCustom();
    }
    PollPage.prototype.ionViewWillEnter = function () {
        this.encuesta = this.navParams.get('encuesta');
        console.log('ionViewWillEnter PollPage');
        this.showAllPollOption(this.encuesta);
        this.showLanguage();
    };
    PollPage.prototype.showAllPollOption = function (encuesta) {
        var _this = this;
        this.pollsService.showAllPollOption(encuesta.id).subscribe(function (data) {
            _this.options = JSON.parse(data['_body']);
        }, function (error) {
            console.error(error);
        });
    };
    PollPage.prototype.getIdOption = function (pollOptionId) {
        console.log(this.encuesta);
        if (this.encuesta['id']) {
            this.optionvoted['user_id'] = this.user_id;
            this.optionvoted['poll_id'] = this.encuesta['id'];
            this.optionvoted['poll_option_id'] = pollOptionId;
        }
    };
    PollPage.prototype.getAllOptionVoted = function () {
        var _this = this;
        var list = this.pollsService.findAllPollsVoted(this.optionvoted['poll_id']);
        list.forEach(function (item) {
            if (item['poll_id'] == _this.encuesta['id'] && item['user_id'] == _this.user_id) {
                //this.optionVoted=true;
            }
        });
    };
    PollPage.prototype.pollVoted = function (form) {
        var _this = this;
        console.log(form.value);
        //let data=JSON.parse(form.value);
        //console.log(data);
        this.pollsService.addPollVoted(form.value).subscribe(function (data) {
            console.log(data);
            _this.events.publish('poll: envio', data);
        }, function (error) {
            console.error(error);
        });
        //console.log(form);
        this.navCtrl.pop();
    };
    PollPage.prototype.showLanguage = function () {
        var _this = this;
        //comprobamos si existe el logueo, sino redirigimos
        this.local.ready().then(function () {
            _this.local.get("language")
                .then(function (data) {
                _this.language.showLanguage(data, 'PollPage').subscribe(function (data) {
                    //console.log('datos: '+data)
                    //let texto=JSON.parse(data['_body']);
                    _this.title = data.text;
                    _this.buttom = data.hijos[0].text;
                }, function (error) {
                    console.error(error);
                });
            });
        });
    };
    //loading 
    PollPage.prototype.presentLoadingCustom = function () {
        var loading = this.loadingCtrl.create({
            spinner: '',
            content: "\n        <ion-spinner icon=\"bubbles\" class=\"spinner-balanced\"></ion-spinner>",
            duration: 1000
        });
        this.showAllPollOption(this.encuesta);
        this.showLanguage();
        loading.onDidDismiss(function () {
            console.log('Dismissed loading');
        });
        loading.present();
    };
    PollPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-poll',
            templateUrl: 'poll.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            LoadingController,
            Events,
            PollsService,
            LanguageProvider,
            Storage])
    ], PollPage);
    return PollPage;
}());
export { PollPage };
//# sourceMappingURL=poll.js.map