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
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
//sanitizer for url
import { DomSanitizer } from '@angular/platform-browser';
//servicio
import { QuizsService } from '../../providers/quizs-service';
import { LanguageProvider } from '../../providers/language/language';
//storage
import { Storage } from '@ionic/storage';
/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var QuizPage = /** @class */ (function () {
    function QuizPage(navCtrl, navParams, quizsService, alertCtrl, loadingCtrl, events, language, dom, local) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.quizsService = quizsService;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.language = language;
        this.dom = dom;
        this.local = local;
        this.quiz = [];
        this.questions = [];
        this.options = [];
        this.testRadioOpen = true;
        this.testRadioResult = [];
        this.user_id = '';
        this.title = "";
        this.questionTitle = "";
        this.answerTitle = "";
        this.buttom = "";
        this.quiz = this.navParams.get('quiz');
        this.local.get("login").then(function (data) {
            if (data) {
                _this.user_id = data.id.toLowerCase();
            }
        });
        this.presentLoadingCustom();
    }
    QuizPage.prototype.ionViewWillEnter = function () {
        console.log('ionViewDidLoad QuizPage');
        this.showAllQuizQuestion(this.quiz);
        this.showLanguage();
    };
    QuizPage.prototype.showAllQuizQuestion = function (quiz) {
        var _this = this;
        this.quizsService.showAllQuizQuestion(quiz.id).subscribe(function (data) {
            _this.questions = JSON.parse(data['_body']);
        }, function (error) {
            console.error(error);
        });
    };
    QuizPage.prototype.showAllQuizQuestionOptions = function (quiz, question) {
        return this.quizsService.showAllQuizQuestionOptions(quiz, question);
    };
    QuizPage.prototype.showHelp = function (question) {
        var alert = this.alertCtrl.create({
            message: question.help
        });
        alert.addButton('OK');
        alert.present();
    };
    QuizPage.prototype.showRadio = function (question) {
        var _this = this;
        console.log(question);
        var subtitle = '';
        if (question.mediatype == 'image') {
            subtitle = '<img src="' + question.mediaurl + '" alt="imagen_' + question.id + '" />';
        }
        if (question.mediatype == 'other' && question.mediaurl != '') {
            if (question.mediaurl.startsWith('https://www.youtube.com/')) {
                var youtube = question.mediaurl.replace(/watch\u003Fv=/i, "embed/");
                var videoUrl = this.dom.bypassSecurityTrustResourceUrl(youtube);
                subtitle = '<iframe width=100% [src]="' + videoUrl + '" allowfullscreen ></iframe>';
            }
            else {
                subtitle = '<a href="' + question.mediaurl + '">' + question.mediaurl + '</a>';
            }
        }
        var inputs = [];
        this.showAllQuizQuestionOptions(question.quiz_id, question.id)
            .subscribe(function (data) {
            _this.options = JSON.parse(data['_body']);
            _this.options.forEach(function (item) {
                inputs.push({
                    type: 'radio',
                    name: item.text,
                    label: item.text,
                    value: item
                });
            });
            var buttons = [{ text: 'Cancel' },
                {
                    text: 'OK',
                    handler: function (data) {
                        _this.testRadioOpen = false;
                        console.log(question.id);
                        _this.testRadioResult[question.id] = data;
                    }
                }];
            var alert = _this.alertCtrl.create({
                message: question.text,
                subTitle: subtitle,
                inputs: inputs,
                buttons: buttons
            });
            alert.present();
        }, function (error) {
            console.error(error);
        });
        console.log(this.testRadioResult);
        console.log(this.testRadioResult[question.id]);
    };
    QuizPage.prototype.enviarCuestionario = function () {
        var _this = this;
        console.log(this.testRadioResult);
        console.log(this.user_id);
        var resultado = [];
        this.testRadioResult.forEach(function (item) {
            console.log(item);
            if (item)
                resultado.push({ user_id: _this.user_id, quiz_id: item.quiz_id, quiz_question_id: item.quiz_question_id, quiz_question_option_id: item.id });
        });
        console.log(resultado);
        //enviamos a BBDD
        this.quizsService.addQuizVoted(resultado)
            .subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.error(error);
        });
        this.events.publish('quiz: envio', this.testRadioResult);
        //save in local
        this.local.set("respuestasQuiz/" + this.quiz['id'], this.testRadioResult);
        this.navCtrl.pop();
    };
    QuizPage.prototype.showLanguage = function () {
        var _this = this;
        //comprobamos si existe el logueo, sino redirigimos
        this.local.ready().then(function () {
            _this.local.get("language")
                .then(function (data) {
                _this.language.showLanguage(data, 'QuizPage').subscribe(function (data) {
                    //console.log('datos: '+data)
                    //let texto=JSON.parse(data['_body']);
                    _this.title = data.text;
                    _this.questionTitle = data.hijos[0].text;
                    _this.answerTitle = data.hijos[1].text;
                    _this.buttom = data.hijos[2].text;
                }, function (error) {
                    console.error(error);
                });
            });
        });
    };
    //loading 
    QuizPage.prototype.presentLoadingCustom = function () {
        var loading = this.loadingCtrl.create({
            spinner: '',
            content: "\n        <ion-spinner icon=\"bubbles\" class=\"spinner-balanced\"></ion-spinner>",
            duration: 1000
        });
        this.showAllQuizQuestion(this.quiz);
        this.showLanguage();
        loading.onDidDismiss(function () {
            console.log('Dismissed loading');
        });
        loading.present();
    };
    QuizPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-quiz',
            templateUrl: 'quiz.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            QuizsService,
            AlertController,
            LoadingController,
            Events,
            LanguageProvider,
            DomSanitizer,
            Storage])
    ], QuizPage);
    return QuizPage;
}());
export { QuizPage };
//# sourceMappingURL=quiz.js.map