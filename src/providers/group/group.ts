import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//observable
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
//servicios
import {ConfigData} from '../config-data';

/*
  Generated class for the GroupProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroupProvider {

  constructor(public http: Http, public configData:ConfigData) {
    console.log('Hello GroupProvider Provider');
  }
  getGroups(id_site,id_user){

     let route=this.configData.rutabase+id_site+'/Users/'+id_user+'/Groups/';
     console.log(route);
     return this.http.get(route).map(res => res.json()).share();
    }


}
