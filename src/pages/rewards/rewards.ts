import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//service
import {RewardsService} from '../../providers/rewards-service';
import {LoginService} from '../../providers/login-server';
import {AsignaturesService} from '../../providers/asignatures-server';
import { LanguageProvider } from '../../providers/language/language';
import { GroupProvider } from '../../providers/group/group';
import { NotificationProvider } from '../../providers/notification/notification';


/**
 * Generated class for the RewardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'rewards'
})
@Component({
  selector: 'page-rewards',
  templateUrl: 'rewards.html',
})
export class RewardsPage {
  public selectasig=[];
  public asignature=[];
  public asignatures=[];
	public resultados=[];
	public recompensas=[];
  public users=[];
  public progress:number;
  public login=false;
  public resultfinal:number;
  public title: string;
  public subtitles=[] ;
  public progreso="";
  public groups=[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public rewardsService:RewardsService, 
    public loginService:LoginService, 
    public asignaturesService:AsignaturesService, 
    public language:LanguageProvider,
    public group:GroupProvider,
    public notification:NotificationProvider,
    public app: App,
    public storage: Storage
    ){
    //cargamos al inicio de la pagina
    this.checkingInitial();
    //this.textos=JSON.parse(this.showLanguage(1));
    //console.log(this.language.showLanguage(1,'RewardPage'));
    if(this.navParams.get('asignature')){
      this.asignature=this.navParams.get('asignature');


    }


    this.selectasig=this.asignature;
    this.showAllRewards(this.asignature['id']);
    this.showAllResultados();
    this.showLanguage();
    this.presentLoadingCustom();
    console.log(this.language);
    

    //console.log('fuera: '+this.textos);
  }

  ionViewDidLoad() {    
    //console.log(this.asignature['id']);
    //
    
    console.log('ionViewDidLoad RewardsPage');

  }
  //carga de los resultados de los cuestionarios
  showAllResultados(){
    //console.log('estoy aqui');
  	this.resultados=this.rewardsService.showAllResultados();
    this.progress=parseInt(this.resultados[0].count);
    this.progress+=parseInt(this.resultados[1].count);
    let flotante = this.progress/this.resultados[3].count;
    this.resultfinal = Math.round(flotante*100);
  }
  //carga de las recompensas
  showAllRewards(siteId){
  	this.rewardsService.showAllRewards(siteId).subscribe(
      (data) => { // Success
        //console.log(data);
        this.recompensas = JSON.parse(data['_body']);
      },
      (error) =>{
        console.error(error);
      }
    )

  }
  //carga idioma
  showLanguage(){
//comprobamos si existe el logueo, sino redirigimos
      this.storage.ready().then(()=>{
        this.storage.get(`language`)
        .then(data =>{        
          this.language.showLanguage(data,'RewardPage').subscribe(
            (data) => { // Success
              //console.log('datos: '+data)
              //let texto=JSON.parse(data['_body']);
              this.title=data.text;
              var objs=data.hijos;
              //var cont=0;
              objs.forEach((item)=> {
                this.subtitles.push(item.text);
                if(item.description=="Titulo Seccion Reward Point"){
                  this.progreso=item.hijos[0].text;
                  this.resultados[0].title=item.hijos[1].text;
                  this.resultados[1].title=item.hijos[2].text;
                  this.resultados[2].title=item.hijos[3].text;
                  this.resultados[3].title=item.hijos[4].text;
                  //console.log(item.hijos[0].text);
                }

              }); 
              
            },
            (error) =>{
              console.error(error);
              
            }
          );
        })
        ;  
    });    

  }


  //cargamos los datos del usuario y la asignaturas
   checkingInitial(){

     //comprobamos si existe el logueo, sino redirigimos
      this.storage.ready().then(()=>{
        this.storage.get(`login`)
        .then(data =>{    
            if(data){
              this.users=data;
              console.log(this.asignature);
              console.log(this.users);
              this.getGroupsUser(this.asignature['id'],this.users);
              this.loginService.user=data;
              this.storage.ready().then(()=>{
                this.storage.get(`asignatures`).then(
                  data =>{
                    if(data){
                      //console.log(data);
                      this.asignatures=data;
                      //console.log(this.users);
                      //console.log(this.asignatures);
                      this.notification.init_notifications(this.asignatures,this.users);
                      this.selectasig=data[0];
                      this.asignature=data[0];                  
                    }
                });
              });
              //console.log(this.selectasig);
              //this.rootPage = TabsPage;
            }
          });
      });
   }   
//get groups user
  getGroupsUser(id_site,id_user){
    this.group.getGroups(id_site,id_user['id']).subscribe(
    (grupos) => { // Success
        console.log(grupos);
        if(grupos[0]){
          for(var i=0; i<grupos[0].length;i++){
            this.groups.push(grupos[0][i].id)
          }          
        }else{
          this.groups.push(0);
        }
        console.log(this.groups);
      this.storage.set(`grupos`,this.groups);

       
        
    },
    (error) =>{
        console.error(error);
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

  loading.onDidDismiss(() => {
    console.log('Dismissed loading');
  });

  loading.present();
}

}
