import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//observable
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
//servicios
import {ConfigData} from '../config-data';

/*
  Generated class for the LanguageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LanguageProvider {
  
  constructor(
  	public http: Http, 
  	public configData:ConfigData
	) {}
	
	  showLanguage(language, page){

     let route=this.configData.rutabase+'languages/'+language+'/'+page;
     return this.http.get(route).map(res => res.json()).share();
    }

    showLanguages(){

     let route=this.configData.rutabase+`languages`;
     console.log(route);
     return this.http.get(route).map(res => res.json()).share();
    }

}
