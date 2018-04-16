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
//import model
import { AsignatureModel } from '../models/asignature-model';
//storage
import { Storage } from '@ionic/storage';
//importar para xml conversor
import X2JS from 'x2js';
//import service
import { ConfigData } from './config-data';
/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AsignaturesService = /** @class */ (function () {
    //public asignature:any [];
    function AsignaturesService(http, local, configData) {
        this.http = http;
        this.local = local;
        this.configData = configData;
        this.user = [];
        this.getAsignatures();
    }
    //local
    AsignaturesService.prototype.getAsignatures = function () {
        var _this = this;
        this.local.ready().then(function () {
            _this.local.get("login").then(function (data) {
                if (data['key']) {
                    _this.user = data;
                    _this.getFromServer(data['key']);
                }
            })
                .catch(function (error) {
                console.log('entrando a catch ' + error);
                _this.asignatures = [
                    {
                        'id': 0,
                        'siteId': '0',
                        'siteTitle': 'error'
                    }
                ];
            });
        })
            .catch(function (error) {
            console.log('entrando a catch ' + error);
        });
    };
    //buscar datos en el servidor
    AsignaturesService.prototype.getFromServer = function (sessionId) {
        var _this = this;
        var route = "https://campusingenieria.unir.net/sakai-ws/rest/sakai/getSitesCurrentUserCanAccess?sessionid=" + sessionId;
        //let route=`https://campusvirtual.unir.net/sakai-ws/rest/sakai/getSitesCurrentUserCanAccess?sessionid=`+sessionId;
        //let route=`https://campusvirtual.preunir.net/sakai-ws/rest/sakai/getSitesCurrentUserCanAccess?sessionid=`+sessionId;
        //console.log(route);
        var json = [];
        return this.http.get(route)
            .map(function (response) {
            //console.log (response)
            //como es xml lo paso a un objeto js
            var xml = response['_body'];
            var parser = new X2JS();
            json = parser.xml2js(xml);
            //solo devuelvo el array de item
            return json['list']['item'];
        })
            .map(function (asignatures) {
            return asignatures.map(function (item) {
                return AsignatureModel.fromJson(item);
            });
        })
            .subscribe(function (result) {
            _this.asignatures = result;
            var asignaturesSakai = result;
            _this.getFromLocalBBDD()
                .subscribe(function (result) {
                var BDAsignatures = JSON.parse(result);
                BDAsignatures.forEach(function (item) {
                    var i = 0;
                    asignaturesSakai.forEach(function (asignature) {
                        if (item.siteId == asignature.siteId) {
                            _this.asignatures[i]['id'] = item['id'];
                        }
                        i++;
                    }); //fin forEach asignatures
                }); //fin forEach BdAsi  
                //comprobamos role del usuario
                _this.asignatures.forEach(function (item) {
                    //console.log(user);
                }); //forEach this.asignatures
                //guardado local
                //this.asignature=this.asignatures[0];
                _this.local.set('asignatures', _this.asignatures);
                _this.local.set('asignature', _this.asignatures[0]);
            }); //fin subcribe localBBDD
        });
    };
    // Get asignatures for local BBDD
    AsignaturesService.prototype.getFromLocalBBDD = function () {
        var route = this.configData.rutabase + "sites";
        console.log(route);
        return this.http.get(route)
            .map(function (res) {
            return res['_body'];
        });
    };
    AsignaturesService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            Storage,
            ConfigData])
    ], AsignaturesService);
    return AsignaturesService;
}());
export { AsignaturesService };
//# sourceMappingURL=asignatures-server.js.map