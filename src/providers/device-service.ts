import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//observable
import {ConfigData} from './config-data';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';


@Injectable()
export class DeviceService {	


constructor(
    public http: Http, 
    public configData:ConfigData
    ) {
  }

  public  showAllDevice(){
    let route=this.configData.rutabase+`Devices/`;
      return this.http.get(route);	
  }
  public  showDevice(device_id){
    let route=this.configData.rutabase+`Devices/`+device_id;
      return this.http.get(route);  
  }


  public addDevice(body){
    console.log(body)
    let route=this.configData.rutabase+`Device`;
    console.log(route);
           return this.http.post(route, body);
  }


}
