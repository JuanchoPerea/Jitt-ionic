import { Component, ViewChild } from '@angular/core';
import { Platform , Nav, MenuController,Events} from 'ionic-angular';

//import { Platform ,NavController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//providers
import {AsignaturesService} from '../providers/asignatures-server';
import {LoginService} from '../providers/login-server';
import {DeviceSiteService} from '../providers/deviceSite-service';
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

//notificaciones
//import { NotificationProvider } from '../providers/notification/notification';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;

}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public login=false;
  public selectasig={};
  public asignatures:any [];
  public asignature={};
  public rootPage:any;
  public users:any [];
  public languageSelect=1;
  public encabezado="";
  @ViewChild(Nav) nav: Nav;


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
   appPages: PageInterface[] = [
    
    /*{ title: 'Recompensas', name: 'RewardsPage', component: RewardsPage, tabComponent: RewardsPage, icon: 'trophy' },*/
    { title: 'Avisos', name: 'NoticesPage', component: NoticesPage, tabComponent: NoticesPage, icon: 'alarm' },
    { title: 'Cuestionarios', name: 'QuizsPage', component: QuizsPage, tabComponent: QuizsPage, icon: 'paper' },
    { title: 'Encuestas', name: 'PollsPage', component: PollsPage, tabComponent: PollsPage, icon: 'list-box' },
    

    ];
 
  
  loggedInPages: PageInterface[] = [
    { title: 'Logout', name: 'Logout', component: NoticesPage, icon: 'log-out'}
    ];

  loggedOutPages: PageInterface[] = [
    { title: 'Login', name: 'LoginPage', component: NoticesPage, icon: 'log-in' },
  ];
  

  constructor(
    //public nav:NavController,
    private events: Events,
    public menuCtrl:MenuController,
    public storage:Storage, 
    public platform: Platform, 
    public statusBar: StatusBar, 
    public asignaturesService: AsignaturesService,
    public loginService: LoginService,
    public splashScreen: SplashScreen,
    //public notification:NotificationProvider,
    //public device:DeviceService,
    public deviceSite:DeviceSiteService,
    public language:LanguageProvider
    ) {
    this.listenToLoginEvents();

    platform.ready().then(() => {
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
    this.asignatures=this.asignaturesService.asignatures
    if(asignaturesService.asignatures){
      this.asignature=this.asignaturesService.asignatures[0];
      this.selectasig=this.asignature;
    }
    this.showLanguage();
    console.log(this.asignature);
    console.log(this.selectasig);
  

    
  }

  listenToLoginEvents() {
    this.events.subscribe('language: change', () => {
      this.showLanguage();
    });

    this.events.subscribe('asignature:select', () => {
      this.showLanguage();
    });
  }

  // notificaciones 

  //fin notificaciones
  //esta funcion nos comprueba si hay datos en local y los carga en las 
  //variables correspondientes
  checkingInitial(){
     //comprobamos si existe el logueo, sino redirigimos
      this.storage.ready().then(()=>{
        this.storage.get(`login`)
        .then(data =>{    
            if(data){
              console.log(data);
              this.users=data;
              this.loginService.user=data;
              this.storage.ready().then(()=>{
                this.storage.get(`asignatures`).then(
                  data =>{
                    if(data){
                      console.log(data);
                      this.asignatures=data;
                      console.log(this.asignatures+' y '+this.users); 
                      //this.notification.init_notifications(this.asignatures,this.users);
                      console.log('data local');
                      if(this.asignatures['id']!=0){
                      console.log('otro');
                      this.selectasig=data[0];
                      this.asignature=data[0];
                      this.storage.ready().then(()=>{
                        this.storage.get(`asignature`).then(
                          data =>{
                            //console.log(data);
                            if(data){
                              this.asignature=data;   
                              this.selectasig=data;
                    
                            }
                        });
                      }); 
                       //registro dispositov antes de redirigir y ya logueado
                      this.rootPage=RewardsPage;  
                      }else{
                      this.asignatures=this.asignaturesService.asignatures                       
                      }
                      //antes
                      //console.log(this.asignatures); 
                      //this.notification.init_notifications(this.asignatures,this.users);
                      
                    }
                });
              });    
            }else{
              this.rootPage=LoginPage;       
            }
            this.login=true;
        });
      });
   }   


   showLanguage(){
    //comprobamos si existe el logueo, sino redirigimos
        this.storage.ready().then(()=>{
          this.storage.get(`language`)
          .then(data =>{        
            this.language.showLanguage(data,'App').subscribe(
              (data) => { // Success
                this.languageSelect=data;
                //console.log('datos: '+data)
                //let texto=JSON.parse(data['_body']);
                //this.title=data.text;
                this.encabezado=data.text;
                this.appPages=[
                   { title: data.hijos[0].text, name: 'NoticesPage', component: NoticesPage, tabComponent: NoticesPage, icon: 'alarm' },
                   { title: data.hijos[1].text, name: 'QuizsPage', component: QuizsPage, tabComponent: QuizsPage, icon: 'paper' },
                   { title: data.hijos[2].text, name: 'PollsPage', component: PollsPage, tabComponent: PollsPage, icon: 'list-box' },
                ];
              },
              (error) =>{
                console.error(error);
                
              }
            );
          })
          ;  
      });    

    }



  selectAsignatura(asignature){ 
     this.saveLocalasignature(asignature)
     this.selectasig=asignature;
     this.nav.resize();
     console.log(asignature);
     //registramos dispositivo en la asignatura
     /*let body={
       device_id=this.notification.device_id

     }

     //this.deviceSite.addDeviceSite(body);*/
     //redireccionamos a la pagina de recompensas
     this.nav.setRoot(RewardsPage, {asignature});
     this.menuCtrl.close();    
  }

  saveLocalasignature(asignature){
    this.storage.set('asignature',asignature);  
  }
  openPage(page) {
    let asignature=this.asignature;
    if (page === 'Logout') {
        //console.log(page);
        this.loginService.logout();
        this.nav.setRoot(LoginPage);
    }else{
        //console.log('resto');
        this.nav.setRoot(page,{asignature});
    }   
    
  }

  

}

