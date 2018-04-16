import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//servicios
import {ConfigData} from './config-data';
//observable
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';


@Injectable()
export class NoticesService {	
 

constructor(
    public http: Http, 
    public configData:ConfigData
    ) {

  }

  public getNotices(siteId){
   
    let route=this.configData.rutabase+siteId+`/Notices`;
       return this.http.get(route);
            
  }
  
}