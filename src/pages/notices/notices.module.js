var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticesPage } from './notices';
import { PipesModule } from '../../pipes/pipes.module';
//import { ConferenceData } from '../../providers/conference-data';
var NoticesPageModule = /** @class */ (function () {
    function NoticesPageModule() {
    }
    NoticesPageModule = __decorate([
        NgModule({
            declarations: [
                NoticesPage,
            ],
            imports: [
                IonicPageModule.forChild(NoticesPage),
                PipesModule
            ],
            exports: [
                NoticesPage,
            ]
        })
    ], NoticesPageModule);
    return NoticesPageModule;
}());
export { NoticesPageModule };
//# sourceMappingURL=notices.module.js.map