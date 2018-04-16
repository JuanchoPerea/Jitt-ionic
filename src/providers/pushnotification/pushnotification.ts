import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { Platform } from 'ionic-angular';


/*
  Generated class for the PushnotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PushnotificationProvider {

  constructor(
  public platform:Platform,
  public oneSignal:OneSignal,
  ) {
    console.log('Hello PushnotificationProvider Provider');
  }

  init_notifications(){
  	  //le pasamos el id de la api en onesignal  y el id remitente de firebase

      console.log(this.platform.platforms());
  	  if(this.platform.is('android')){ 

  	  	this.oneSignal.startInit('908ff3a1-7dc3-4ecf-b593-c68a734bf582', '721451220404');
        console.log('onesignal android'); 
    		this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
        this.oneSignal.getIds().then((ids) =>{
        console.log(ids);
        }).catch((err) =>{
        console.log("no se pudo obtener el id" + err);
        });
    		this.oneSignal.handleNotificationReceived().subscribe(() => {
    		 // do something when notification is received
    		 console.log('Recibido mensaje');
    		});

    		this.oneSignal.handleNotificationOpened().subscribe(() => {
    		  // do something when a notification is opened
    		  console.log('aqui estaría al redireccion');
    		});

    		this.oneSignal.endInit();

  	  }else{
  	  	console.log('OneSignal no funciona en Chrome');

  	  }
	
  }

}
  