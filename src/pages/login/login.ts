import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams,Events} from 'ionic-angular';
//servico
import { LoginService } from '../../providers/login-server';
import { LanguageProvider } from '../../providers/language/language';
import { AsignaturesService } from '../../providers/asignatures-server';
import { Storage } from '@ionic/storage';
//notificaciones
import { NotificationProvider } from '../../providers/notification/notification';
//page
//import { AsignaturesPage } from '../asignatures/asignatures';
import { RewardsPage } from '../rewards/rewards';

//modelos
import { UserModel } from '../../models/user-model';
import { AsignatureModel } from '../../models/asignature-model';


@IonicPage(
  {
  name: 'login',
  segment: 'login'
  }
  )
@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  submitted = false;
  public users: UserModel[]=[];
  public asignatures:AsignatureModel[]=[];
  public languages=[];
  public languageSelect=1;

  constructor(
    private events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginService: LoginService,
    public local:Storage,
    public notification:NotificationProvider,
    public asignaturesService:AsignaturesService,
    public language:LanguageProvider,
    ) {
         this.showLanguages();
    }
 ionViewDidLoad() {    
    //console.log(this.asignature['id']);
    //
    
    console.log('ionViewDidLoad LoginPage');
   this.showLanguages();

  }
//llamada al controlador para login
  login(form: NgForm){ 
    //obtenemos key del usuario(logueo) 
    this.loginService.loadFromServer(form.value.username, form.value.password)
    .subscribe(
        (result:UserModel[])=>{
          this.users = result;
          console.log(this.users[0]);      
          this.loginService.user=this.users[0]; 
          this.local.set('login',this.users[0]); 
          this.asignatures=this.asignaturesService.asignatures;
          //guardado en local 
          if(this.asignatures[0].siteTitle!='error'||''){
            console.log(this.asignatures);
            this.local.set('asignatures', this.asignatures);
            this.local.set('asignature', this.asignatures[0]);
            this.navCtrl.setRoot( RewardsPage, {asignature:this.asignatures[0]}); 
          }else{
          console.log('error en data local');
           this.asignaturesService.getFromServer(this.users[0]['key']); 
           this.asignatures=this.asignaturesService.asignatures;
           this.local.set('asignatures', this.asignatures);
           this.local.set('asignature', this.asignatures[0]);
           this.events.publish('asignature: select', {asignature:this.asignatures[0]});
           this.navCtrl.setRoot( RewardsPage, {asignature:this.asignatures[0]});
          }
            this.local.set('language', this.languageSelect);
           
          //this.notification.init_notifications(this.asignatures,form.value.username);

        },
        error=>{
          console.log('Error loading users from server', error)

        });
        
  }

showLanguages(){
  this.language.showLanguages()
    .subscribe(
      (languages) =>{
        console.log(languages);
        this.languages=languages;
       
      }
    );
}

selectLanguage(languageSelect){
  this.local.set('language', languageSelect);
  this.events.publish('language: change',{language:languageSelect});

}
/*  localLogin(){
     this.local.ready().then(()=>{
      this.local.get(`login`).then(
        data =>{
            if(data['key']){
               this.asignaturesService.getFromServer.(data['key']);
            }
           
      })
      .catch((error)=>{
        console.log('entrando a catch '+ error);
    });
    })
    .catch((error)=>{
      console.log('entrando a catch '+ error);

    });    
  }
*/
  
 
  

}