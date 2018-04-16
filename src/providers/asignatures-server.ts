import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//observable
//import { Observable} from 'rxjs/Rx'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
//import model
import {AsignatureModel} from '../models/asignature-model'
//storage
import { Storage } from '@ionic/storage';
//importar para xml conversor
import X2JS from 'x2js';
//import service
import {ConfigData} from './config-data';


/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AsignaturesService {	
 //llamada al modelo
  public asignatures: AsignatureModel[];
  public BDAsignatures: AsignatureModel[];
  public user=[];
  //public asignature:any [];
  constructor(
  	public http: Http, 
  	public local:Storage,
    public configData: ConfigData
  	) {
    this.getAsignatures();
    
  }
 
//local
  private getAsignatures(){
    this.local.ready().then(()=>{
      this.local.get(`login`).then(
        data =>{
            if(data['key']){
               this.user=data;
               this.getFromServer(data['key']);
            }      
      })
      .catch((error)=>{
        console.log('entrando a catch '+ error);
         this.asignatures=[
         {
           'id':0,
           'siteId':'0',
           'siteTitle':'error'
         }];
      });
    })
    .catch((error)=>{
      console.log('entrando a catch '+ error);

    });    
  }

//buscar datos en el servidor
  public getFromServer(sessionId){
	  let route=`https://campusingenieria.unir.net/sakai-ws/rest/sakai/getSitesCurrentUserCanAccess?sessionid=`+sessionId;
    //let route=`https://campusvirtual.unir.net/sakai-ws/rest/sakai/getSitesCurrentUserCanAccess?sessionid=`+sessionId;
    //let route=`https://campusvirtual.preunir.net/sakai-ws/rest/sakai/getSitesCurrentUserCanAccess?sessionid=`+sessionId;
    //console.log(route);
    let json=[];
    return this.http.get(route)
    .map(response =>{
      //console.log (response)
      //como es xml lo paso a un objeto js
        let xml = response['_body'];
        let parser : any = new X2JS();
        json = parser.xml2js(xml); 
        //solo devuelvo el array de item
        return json['list']['item'];
    })
    .map((asignatures:Object[])=>{      
      return asignatures.map(item=>     
      AsignatureModel.fromJson(item));
    })
    .subscribe((result)=>{
      this.asignatures=result;
      let asignaturesSakai=result;
      this.getFromLocalBBDD() 
              .subscribe(
                (result)=>{
                  let BDAsignatures = JSON.parse(result);
                  BDAsignatures.forEach(item=>{
                    let i=0;
                    asignaturesSakai.forEach(asignature=>{
                      if (item.siteId==asignature.siteId){
                        this.asignatures[i]['id'] = item['id'];
                      }
                    i++;  
                    });//fin forEach asignatures
                  });//fin forEach BdAsi  
                      //comprobamos role del usuario
                    this.asignatures.forEach(item =>{
                      //console.log(user);
                    });//forEach this.asignatures
                    //guardado local
                    //this.asignature=this.asignatures[0];
                    this.local.set('asignatures', this.asignatures);
                    this.local.set('asignature', this.asignatures[0]);

              });//fin subcribe localBBDD
    });
      
  }

// Get asignatures for local BBDD
  private getFromLocalBBDD() {
    let route=this.configData.rutabase+`sites`;
    console.log(route);
    return this.http.get(route)
            .map(res =>{
             return res['_body'];
            })
  }




}