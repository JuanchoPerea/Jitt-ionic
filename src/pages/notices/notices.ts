import { Component } from '@angular/core';
import { IonicPage,  NavParams, AlertController,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//pipe

import {NoticesService} from '../../providers/notices-service';
import { LanguageProvider } from '../../providers/language/language';


/**
 * Generated class for the NoticesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'notices'
})
@Component({
  selector: 'page-notices',
  templateUrl: 'notices.html',
})
export class NoticesPage {
  
  public avisos:  any[];
  public asignature={
    id:Number,
    siteId:String
  };
  public title="";
  public listadoTitle="";
  public groups=[];
  
  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public noticesService:NoticesService,
    public language: LanguageProvider,
    public storage: Storage
  	){ 
      this.asignature=this.navParams.get('asignature'); 
      this.getGrupos();

    }

  ionViewWillEnter() {
    console.log('ionViewDidLoad NoticesPage');
     this.getGrupos();
     this.showLanguage();
     this.showListAvisos();
     this.presentLoadingCustom();
  }
   //funcion para la validacion
  public showListAvisos(){
      this.noticesService.getNotices(this.asignature.id).subscribe(
      (data) => { // Success
        console.log(data);
        this.avisos = JSON.parse(data['_body']);
      },
      (error) =>{
        console.error(error);
      }
    )
       //this.avisos=this.noticesService.notices;
       console.log(this.avisos);
        //this.avisos=this.noticesService.notices;
  }

  public showAviso(aviso){
    let alert=this.alertCtrl.create( 
      {
        title: aviso.title,
        message:aviso.message,
        buttons: ['OK']
      });
    //console.log('avisoId',this.aviso.id);
    alert.present();
    
  }

  public getGrupos(){
     this.storage.ready().then(()=>{
        this.storage.get(`grupos`)
        .then(data =>{
          console.log(data);
           this.groups=data; 
        })
     })       
  }

  showLanguage(){
//comprobamos si existe el logueo, sino redirigimos
      this.storage.ready().then(()=>{
        this.storage.get(`language`)
        .then(data =>{        
          this.language.showLanguage(data,'NoticesPage').subscribe(
            (data) => { // Success
              //console.log('datos: '+data)
              //let texto=JSON.parse(data['_body']);
              this.title=data.text;
              this.listadoTitle=data.hijos[0].text;
              

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

  loading.onDidDismiss(() => {
    console.log('Dismissed loading');
  });

  loading.present();
}

//refresh
doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
     this.getGrupos();
     this.showLanguage();
     this.showListAvisos();

      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
