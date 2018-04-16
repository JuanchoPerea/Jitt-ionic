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
import { FCM } from '@ionic-native/fcm';
import { Platform } from 'ionic-angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import 'rxjs/add/operator/map';
import { DeviceService } from '../device-service';
import { DeviceSiteService } from '../deviceSite-service';
/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var NotificationProvider = /** @class */ (function () {
    function NotificationProvider(fcm, uniqueDeviceID, device, deviceSite, platform) {
        this.fcm = fcm;
        this.uniqueDeviceID = uniqueDeviceID;
        this.device = device;
        this.deviceSite = deviceSite;
        this.platform = platform;
        this.device_id = '';
        console.log('Hello NotificationProvider Provider');
    }
    NotificationProvider.prototype.init_notifications = function (asignatures, user) {
        //registro device
        var _this = this;
        this.uniqueDeviceID.get()
            .then(function (uuid) {
            _this.device_id = uuid;
            console.log(_this.device_id);
            console.log(_this.platform.platforms());
            if (_this.platform.is('cordova')) {
                console.log('dentro del registro');
                //this.fcm.subscribeToTopic('marketing');
                //if(existe){
                _this.fcm.getToken().then(function (token) {
                    var body = {
                        id: _this.device_id,
                        push_token: token,
                    };
                    console.log(body);
                    _this.device.addDevice(body);
                    //console.log(asignatures);
                    //console.log(user);
                    //console.log(asignatures.length);
                    /*for (let i=0, i< asignatures.leght)
                    this.deviceSite.add*/
                });
            }
            console.log(uuid);
        })
            .catch(function (error) { return console.log(error); });
        var body = {
            id: 'f1b96a82-ed3b-5561-0000-000000000008',
            push_token: 'geir481uxGg:APA91bH7b52_3klk9bEfm3hPiHuVlz8sXEq1UrZvbEb4vormQRDNEfLWT0O1on-PpZs-zCOghCgsJjOYLGiiqxrh795KXXJOFWvyDnvehPMVIK2h8ArTOtin3APYYFgKELM8GRSoANEp'
        };
        console.log(JSON.stringify(body));
        console.log(JSON.stringify(user));
        /*this.device.addDevice(body).subscribe(
            (data)=>{
                console.log(data);
            }
        );*/
        asignatures.forEach(function (item) {
            var body2 = "";
            if (cont == 0) {
                body2 += "('" + body.id + "'," + item.id + ",'" + user.id + "')";
                cont++;
            }
            else {
                body2 += ",('" + body.id + "'," + item.id + ",'" + user.id + "')";
                cont++;
            }
        });
        console.log(asignatures);
        this.deviceSite.addDeviceSite(body2).subscribe(function (data) {
            console.log(data);
        });
        console.log('no entra en el registro');
        //comprobamos la plataforma, en web vale  
        if (this.platform.is('cordova')) {
            this.fcm.onNotification().subscribe(function (data) {
                if (data.wasTapped) {
                    console.log(data.wasTapped);
                    console.log("Received in background");
                }
                else {
                    console.log("Received in foreground");
                }
                ;
            });
            /*this.fcm.onTokenRefresh().subscribe(token=>{
              console.log(token);
            })
            this.fcm.unsubscribeFromTopic('marketing');*/
        }
    };
    NotificationProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [FCM,
            UniqueDeviceID,
            DeviceService,
            DeviceSiteService,
            Platform])
    ], NotificationProvider);
    return NotificationProvider;
}());
export { NotificationProvider };
//# sourceMappingURL=notification.js.map