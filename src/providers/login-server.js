var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//observable
//import { Observable} from 'rxjs/Rx'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
//storage
import { Storage } from '@ionic/storage';
//models
import { AsignaturesService } from './asignatures-server';
import { UserModel } from '../models/user-model';
/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var LoginService = /** @class */ (function () {
    function LoginService(http, local, asignaturesService) {
        this.http = http;
        this.local = local;
        this.asignaturesService = asignaturesService;
    }
    //conecta con sakai y devuelve la key, la cual también se almacena en local
    LoginService.prototype.loadFromServer = function (id, pw) {
        var users = [];
        var route = "https://campusingenieria.unir.net/sakai-ws/rest/login/login?id=" + id + "&pw=" + pw;
        //let route =`https://campusvirtual.unir.net/sakai-ws/rest/login/login?id=${id}&pw=${pw}`;
        //let route =`https://campusvirtual.preunir.net/sakai-ws/rest/login/login?id=${id}&pw=${pw}`;
        return this.http.get(route)
            .map(function (response) {
            console.log(response);
            users = [{
                    'id': id,
                    'pw': pw,
                    'key': response['_body']
                }];
            return users;
        })
            .map(function (users) {
            return users.map(function (item) {
                return UserModel.fromJson(item);
            });
        });
    };
    LoginService.prototype.checkForRole = function (user, site) {
        var sessionId = user.key;
        //let username=user.id;
        //console.log(sessionId);
        // console.log(site);
        var roles = ["Profesor", "Alumno", "Coordinador Académico", "Profesor +"];
        //los roles no se pasan correctamente, ya que el coordinador y el profesor + no lo pilla
        //let roles=["Profesor", "Coordinador Académico","Profesor +"];
        var rolesString = "";
        /*for (var i=0; i<roles.length; i++) {
          rolesString += i == 0 ? "" : ",";
          rolesString += roles[i];
        }*/
        for (var i = 0; i < roles.length; i++) {
            if (i == 0) {
                rolesString += roles[i];
            }
            else {
                rolesString += "," + roles[i];
            }
        }
        // rolesString=encodeURI(rolesString);
        //console.log(rolesString);
        //console.log("sitio:"+site+" username:"+username+" roles:"+roles);
        var authGroupWithRoleURL = "https://campusingenieria.unir.net/sakai-ws/rest/sakai/getUsersInAuthzGroupWithRole?sessionid=" + sessionId + "&authzgroupid=/site/" + site + "&authzgrouproles=" + rolesString;
        //let authGroupWithRoleURL =`https://campusingenieria.unir.net/sakai-ws/rest/sakai/getUsersInAuthzGroup?sessionid=${sessionId}&authzgroupid=/site/${site}`;
        //let authGroupWithRoleURL =`https://campusvirtual.preunir.net/sakai-ws/rest/sakai/getUsersInAuthzGroupWithRole?sessionid=${sessionId}&authzgroupid=/site/${site}&authzgrouproles=${rolesString}`;
        //let authGroupWithRoleURL =`https://campusvirtual.unir.net/sakai-ws/rest/sakai/getUsersInAuthzGroupWithRole?sessionid=${sessionId}&authzgroupid=/site/${site}&authzgrouproles=${rolesString}`;
        // console.log(authGroupWithRoleURL);
        return this.http.get(authGroupWithRoleURL);
    };
    LoginService.prototype.logout = function () {
        console.log('borrando...');
        this.local.remove("login");
        this.local.remove("asignatures");
        this.local.remove("asignature");
        this.local.remove("roles/");
        this.local.set("language", 1);
        this.local.remove("grupos");
        this.asignaturesService.asignatures = [{
                id: 0,
                siteId: '',
                siteTitle: 'error'
            }];
        this.user = [];
    };
    LoginService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            Storage,
            AsignaturesService])
    ], LoginService);
    return LoginService;
}());
export { LoginService };
//# sourceMappingURL=login-server.js.map