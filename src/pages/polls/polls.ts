import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//servicio
import {PollsService} from '../../providers/polls-service';
import {LoginService} from '../../providers/login-server';
import { LanguageProvider } from '../../providers/language/language';

//page
import {PollPage} from '../poll/poll';
/**
 * Generated class for the PollsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'polls'
})
@Component({
  selector: 'page-polls',
  templateUrl: 'polls.html',
})
export class PollsPage {
  public user_id='';
  public pendientes=[];
  public votadas=[];
	public encuestas=[];
  public asignature= {
    id:Number,
    siteId:String
  }; 
  public listvote=[]; 
  public subtitle='';
  public title={};
  public button=[];
  public groups=[];

  constructor(
    public storage: Storage,
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public events:Events,
  	public pollsService:PollsService,
    public loginService:LoginService,
    public language:LanguageProvider
  	) {
   
    this.presentLoadingCustom();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PollsPage');
    console.log(this.encuestas);
    this.listenToLoginEvents();

    //this.getAllVotedbyUser('47289462j');

  }
  //para refrescar la vista cuando vuelvo de la poll
  listenToLoginEvents() {
    this.events.subscribe('poll: envio', (data) => {
      this.presentLoadingCustom();

    });
  }

  showAllPolls(asignature,user_id){
  this.pollsService.showAllPolls(asignature, user_id).subscribe(
      (data) => { // Success
        console.log(data);
        this.encuestas = JSON.parse(data['_body']);
      },
      (error) =>{
        console.error(error);
      }
    );
  }

  getAllVotedbyUser(user_id){
     
    this.pollsService.findAllPollsVotedByUser(user_id)
    .subscribe(
      (data) => { // Success
        this.listvote = JSON.parse(data['_body']);
        console.log(this.listvote); 
        this.encuestas.forEach(poll=>{
          this.listvote.forEach(item=>{
            console.log(poll);
            console.log(item);
            if(poll['id']==item['poll_id']){
              this.encuestas['voted']=true;
            }else{
              this.encuestas['voted']=false;
            }
          });
        });
        console.log(this.encuestas);
      },
      (error) =>{
        console.error(error);
      }
    );    
    
  }
  showEncuesta(encuesta){
  	this.navCtrl.push(PollPage ,{encuesta});
  }
  
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
    this.asignature=this.navParams.get('asignature');
    this.user_id=this.loginService.user['id'];
    this.showAllPolls(this.asignature.id, this.user_id);
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
          this.language.showLanguage(data,'PollsPage').subscribe(
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
    this.asignature=this.navParams.get('asignature');
    this.user_id=this.loginService.user['id'];
    this.showAllPolls(this.asignature.id, this.user_id);
    this.getGrupos();
    this.showLanguage();
    this.listenToLoginEvents();

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();
  }

}
