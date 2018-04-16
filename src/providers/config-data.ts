import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//observable
//import { Observable} from 'rxjs/Rx'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';




/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigData {	

  public rutabase: string;



  constructor(
    public http: Http, 
   
    ) {
    //this.rutabase="http://10.101.60.106:3090/api/";
    this.rutabase="https://rd.unir.net/demo/jitt/api/";    
  }
   

}
