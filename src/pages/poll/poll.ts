import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Events } from 'ionic-angular';
//servicio
import {PollsService} from '../../providers/polls-service';
import { LanguageProvider } from '../../providers/language/language';

//storage
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PollPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-poll',
  templateUrl: 'poll.html',
})
export class PollPage {
  public user_id='';
  public optionvoted=[{
    user_id: String,
    poll_id: Number,
    poll_option_id:Number
  }];
  public options=[];
  public encuesta= [{
    id: Number,
    site_id: Number,
    creation: Date,
    title: String,
    message: String,
    state :String
  }];
  public title="";
  public buttom="";
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public events:Events,
  	public pollsService: PollsService,
    public language:LanguageProvider,
    public local: Storage) {

  	 this.local.get(`login`).then(
        data =>{
          if (data){
          this.user_id=data.id.toLowerCase();
          }
        });  
     //this.getAllOptionVoted();
     this.presentLoadingCustom();
  }

  ionViewWillEnter() {
    this.encuesta=this.navParams.get('encuesta');
    console.log('ionViewWillEnter PollPage');
    
    this.showAllPollOption(this.encuesta);
    this.showLanguage();

  }
  


  showAllPollOption(encuesta){
    this.pollsService.showAllPollOption(encuesta.id).subscribe(
      (data) => { // Success
        this.options = JSON.parse(data['_body']);     
      },
      (error) =>{
        console.error(error);
      }
    );  	
	}

  getIdOption(pollOptionId){
    console.log(this.encuesta);
    
    if(this.encuesta['id']){
      this.optionvoted['user_id']=this.user_id;
    	this.optionvoted['poll_id']=this.encuesta['id'];
      this.optionvoted['poll_option_id']=pollOptionId;
    }
  }


  getAllOptionVoted(){
    let list=this.pollsService.findAllPollsVoted(this.optionvoted['poll_id']);
    list.forEach(item=>{
      if(item['poll_id']==this.encuesta['id'] && item['user_id']==this.user_id){
        //this.optionVoted=true;
      }
    });
  }

  pollVoted(form){
    console.log(form.value);
    //let data=JSON.parse(form.value);
    //console.log(data);
    this.pollsService.addPollVoted(form.value).subscribe(
      (data) => { // Success
       console.log(data);
       this.events.publish('poll: envio', data);
       
      },
      (error) =>{
        console.error(error);
      }
    );    
    //console.log(form);
     this.navCtrl.pop();
  }

 showLanguage(){
//comprobamos si existe el logueo, sino redirigimos
      this.local.ready().then(()=>{
        this.local.get(`language`)
        .then(data =>{        
          this.language.showLanguage(data,'PollPage').subscribe(
            (data) => { // Success
              //console.log('datos: '+data)
              //let texto=JSON.parse(data['_body']);
              this.title=data.text;
              this.buttom=data.hijos[0].text
              
            },
            (error) =>{
              console.error(error);
              
            }
          );
        })
        ;  
    });    

  }

 //loading 
 presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: '',
      content: `
        <ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner>`,
      duration: 1000
    });
    this.showAllPollOption(this.encuesta);
    this.showLanguage();

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();
  }

}
