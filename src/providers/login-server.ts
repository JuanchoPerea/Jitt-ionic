import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//observable
//import { Observable} from 'rxjs/Rx'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
//storage
import { Storage } from '@ionic/storage';
//models
import {AsignaturesService} from './asignatures-server';
import { UserModel } from '../models/user-model';





/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginService {	

  public user;


  constructor(
    public http: Http, 
    public local:Storage, 
    public asignaturesService:AsignaturesService
   
    ) {
  }
  
  

  //conecta con sakai y devuelve la key, la cual también se almacena en local
  public loadFromServer(id:string, pw:string){
    let users=[];
    let route =`https://campusingenieria.unir.net/sakai-ws/rest/login/login?id=${id}&pw=${pw}`;
    //let route =`https://campusvirtual.unir.net/sakai-ws/rest/login/login?id=${id}&pw=${pw}`;
    //let route =`https://campusvirtual.preunir.net/sakai-ws/rest/login/login?id=${id}&pw=${pw}`;

    return this.http.get(route)
      .map(response =>{
        console.log(response);
       users=[{
         'id': id,
         'pw':pw,
         'key':response['_body']
       }];    
      return users;})
      .map((users:Object[])=>{      
        return users.map(item=>     
          UserModel.fromJson(item));
      })
  }

  public checkForRole (user, site) {
    
   let sessionId = user.key;
   //let username=user.id;
   //console.log(sessionId);
     // console.log(site);

   let roles=["Profesor", "Alumno","Coordinador Académico","Profesor +"];
   //los roles no se pasan correctamente, ya que el coordinador y el profesor + no lo pilla
   //let roles=["Profesor", "Coordinador Académico","Profesor +"];
  let rolesString = "";
  /*for (var i=0; i<roles.length; i++) {
    rolesString += i == 0 ? "" : ",";
    rolesString += roles[i];
  }*/
  for (var i=0; i<roles.length; i++) {

    if (i==0){
      rolesString+=roles[i];
    }else{
      rolesString+=","+roles[i];
    }
  }
 // rolesString=encodeURI(rolesString);
  //console.log(rolesString);
  //console.log("sitio:"+site+" username:"+username+" roles:"+roles);
  let authGroupWithRoleURL =`https://campusingenieria.unir.net/sakai-ws/rest/sakai/getUsersInAuthzGroupWithRole?sessionid=${sessionId}&authzgroupid=/site/${site}&authzgrouproles=${rolesString}`;
  //let authGroupWithRoleURL =`https://campusingenieria.unir.net/sakai-ws/rest/sakai/getUsersInAuthzGroup?sessionid=${sessionId}&authzgroupid=/site/${site}`;
  //let authGroupWithRoleURL =`https://campusvirtual.preunir.net/sakai-ws/rest/sakai/getUsersInAuthzGroupWithRole?sessionid=${sessionId}&authzgroupid=/site/${site}&authzgrouproles=${rolesString}`;
  //let authGroupWithRoleURL =`https://campusvirtual.unir.net/sakai-ws/rest/sakai/getUsersInAuthzGroupWithRole?sessionid=${sessionId}&authzgroupid=/site/${site}&authzgrouproles=${rolesString}`;

 // console.log(authGroupWithRoleURL);
  return this.http.get(authGroupWithRoleURL);
  
  }
  
  logout(){
    console.log('borrando...');
    this.local.remove(`login`);
    this.local.remove(`asignatures`);
    this.local.remove(`asignature`);
    this.local.remove(`roles/`);
    this.local.set(`language`, 1);
    this.local.remove(`grupos`);

    this.asignaturesService.asignatures=[{
      id:0,
      siteId:'',
      siteTitle:'error'
    }];
    this.user=[]
  }

}
