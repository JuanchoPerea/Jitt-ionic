import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//observable
import {ConfigData} from './config-data';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DeviceSiteService {	


constructor(
    public http: Http, 
    public configData:ConfigData
    ) {  }

	public  showAllDevicesBySite(siteId){
	  let route=this.configData.rutabase+siteId+`DeviceSites`;
	    return this.http.get(route);	
	}
	public addDeviceSite(body){
		console.log(body);
	    let route=this.configData.rutabase+`DeviceSites`;
	    console.log(route);
	 	return this.http.post(route, body); 

	}

	public checkDeviceSite(siteId,user_id,device_id){
	    let route=this.configData.rutabase+siteId+`/User/`+user_id+`/device/`+device_id;
	    console.log(route);
	 	return this.http.get(route).map(res => res.json()).share();; 

	}
}