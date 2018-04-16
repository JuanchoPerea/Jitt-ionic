import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Events} from 'ionic-angular';
import { Storage } from '@ionic/storage';

//servicio
import {QuizsService} from '../../providers/quizs-service';
import {LoginService} from '../../providers/login-server';
import { LanguageProvider } from '../../providers/language/language';

//page
import {QuizPage} from '../quiz/quiz';
/**
 * Generated class for the QuizsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'quizs',
})
@Component({
  selector: 'page-quizs',
  templateUrl: 'quizs.html',
})
export class QuizsPage {
  public user_id='';
  public pendientes=[];
  public votadas=[];
  public quizs=[];
  public asignature=[];
  public title="";
  public subtitle="";
  public button=[];
  public groups=[];
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public events:Events,
  	public quizsService:QuizsService,
    public loginService:LoginService,
    public language:LanguageProvider,
    public storage:Storage
  	) {
  	
    this.presentLoadingCustom();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizsPage');
    this.listenToLoginEvents();

  }

  //refrescar cuando se vuelve de la vista 

  listenToLoginEvents() {
    this.events.subscribe('quiz: envio', (data) => {
      this.presentLoadingCustom();

    });
  }

//para mostrar las Quizs
  showAllQuizs(siteId, user_id){
  	return this.quizsService.showAllQuizs(siteId, user_id).subscribe(
      (data) => { // Success
        this.quizs = JSON.parse(data['_body']);
      },
      (error) =>{
        console.error(error);
      }
    );
  }

  showQuiz(quiz){
    console.log(quiz);
  	this.navCtrl.push(QuizPage ,{quiz});
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.asignature=this.navParams.get('asignature');
      this.user_id=this.loginService.user['id'];
      this.showAllQuizs(this.asignature['id'], this.user_id);
      this.getGrupos();
      this.showLanguage();
      this.presentLoadingCustom();
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

showLanguage(){
//comprobamos si existe el logueo, sino redirigimos
      this.storage.ready().then(()=>{
        this.storage.get(`language`)
        .then(data =>{        
          this.language.showLanguage(data,'QuizsPage').subscribe(
            (data) => { // Success
              //console.log('datos: '+data)
              //let texto=JSON.parse(data['_body']);
              this.subtitle=data.hijos[0].text;
              this.title=data.text;
              this.button.push(data.hijos[0].hijos[0].text);
              this.button.push(data.hijos[0].hijos[1].text);
            },
            (error) =>{
              console.error(error);
              
            }
          );
        })
        ;  
    });    

  }
 //get groups groups
  getGrupos(){
     this.storage.ready().then(()=>{
        this.storage.get(`grupos`)
        .then(data =>{
           this.groups=data; 
        })
     })       
  } 

//loading 
 presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: '',
      content: `
        <ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner>`,
      duration: 1000
    });
    //datos que se cargaran al inicio
    console.log(this.loginService.user);
    this.asignature=this.navParams.get('asignature');
    this.user_id=this.loginService.user['id'];
    this.showAllQuizs(this.asignature['id'], this.user_id);
    this.getGrupos();
    this.showLanguage();
    this.listenToLoginEvents();
    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();
  }

}
