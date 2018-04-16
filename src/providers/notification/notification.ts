import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm';
import { Platform } from 'ionic-angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import 'rxjs/add/operator/map';
import  {DeviceService} from '../device-service';
import  {DeviceSiteService} from '../deviceSite-service';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  public device_id='';	

  constructor(
  	public fcm:FCM, 
  	public uniqueDeviceID: UniqueDeviceID, 
  	public device:DeviceService, 
  	public deviceSite:DeviceSiteService, 
  	public platform:Platform
  	) {
    console.log('Hello NotificationProvider Provider');
  }

  init_notifications(asignatures,user){
  	//registro device
  	
  	this.uniqueDeviceID.get()
	  .then((uuid: any) => {
	  	this.device_id=uuid;
	  	console.log(this.device_id);
	  	console.log(this.platform.platforms());
	  	if(this.platform.is('cordova')){
	  		console.log('dentro del registro');

	  	

		//this.fcm.subscribeToTopic('marketing');
			
		 	//if(existe){
		 	this.fcm.getToken().then(token=>{
			 	let body={
			 		id : this.device_id,
			 		push_token : token,
			 		//method:'update'
		 		}
		

			 	this.device.addDevice(body).subscribe(
			 		(data)=>{
			 			console.log(data);
			 		}
			 	);
			 	

			 	asignatures.forEach(item=>{	
				 	this.deviceSite.checkDeviceSite(item.id, user.id, body.id).subscribe(
				 		(data)=>{
				 			console.log(JSON.stringify(data));
				 			if (data.count==0){
				 				console.log('no existe ya el device-site')
				 				let body2={
						        	device_id: body.id,
						        	site_id:item.id,
						        	user_id: user.id
					        	}
					        	console.log(JSON.stringify(body2));
							 	this.deviceSite.addDeviceSite(body2).subscribe(
							 		(device)=>{
					 					console.log(JSON.stringify(device));
							 	});
				 			}else{
				 				console.log('existe ya el device-site')
				 			}
				 			
				 	});	        			        
			    }); 
			    
				
			});
		}
	  	console.log(uuid);
	  })
	  .catch((error: any) => console.log(error));
	  		
			console.log('no entra en el registro');
	//comprobamos la plataforma, en web vale  
  	  
	if(this.platform.is('cordova')){ 

		this.fcm.onNotification().subscribe(data=>{
		  if(data.wasTapped){
		  	console.log(data.wasTapped);
		    console.log("Received in background");
		  } else {
		    console.log("Received in foreground");
		  };
		});

		/*this.fcm.onTokenRefresh().subscribe(token=>{
		  console.log(token);
		})
		this.fcm.unsubscribeFromTopic('marketing');*/
	}
	
  }

}