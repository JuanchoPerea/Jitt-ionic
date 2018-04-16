import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//import localStorage
import { IonicStorageModule } from '@ionic/storage';
//servicios
import {LoginService} from '../providers/login-server';
import {AsignaturesService} from '../providers/asignatures-server';
import {NoticesService} from '../providers/notices-service';
import {RewardsService} from '../providers/rewards-service';
import {PollsService} from '../providers/polls-service';
import {QuizsService} from '../providers/quizs-service';
import {ConfigData} from '../providers/config-data';
import { DeviceService } from '../providers/device-service';
import { DeviceSiteService } from '../providers/deviceSite-service';
import { NotificationProvider } from '../providers/notification/notification';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { FCM } from '@ionic-native/fcm';
import { LanguageProvider } from '../providers/language/language';
import { GroupProvider } from '../providers/group/group';

//paginas
import { MyApp } from './app.component';
//import { TabsPage } from '../pages/tabs-page/tabs-page';
import { LoginPage } from '../pages/login/login';
import { PollPage } from '../pages/poll/poll';
import { QuizPage } from '../pages/quiz/quiz';
import { RewardsPage } from '../pages/rewards/rewards';

//pipes-filtros



/*import { NoticesPage } from '../pages/notices/notices';
import { PollsPage } from '../pages/polls/polls';
import { QuizsPage } from '../pages/quizs/quizs';*/

@NgModule({
  declarations: [
    MyApp,
    //TabsPage,
    LoginPage,
    PollPage,  
    QuizPage, 
    RewardsPage,
    /*NoticesPage,
    PollsPage,
    QuizsPage*/
  ],
  imports: [
    BrowserModule,
    HttpModule, //incluido
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //TabsPage,
    LoginPage,
    PollPage,
    QuizPage,
    RewardsPage,
    /*NoticesPage,
    PollsPage,
    QuizsPage*/
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginService,
    AsignaturesService,
    NoticesService,
    RewardsService,
    PollsService,
    QuizsService,
    ConfigData,
    FCM,
    UniqueDeviceID,
    NotificationProvider,
    DeviceSiteService,
    DeviceService,
    LanguageProvider,
    GroupProvider,
    
  ]
})
export class AppModule {}
