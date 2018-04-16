import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticesPage } from './notices';
import { PipesModule } from '../../pipes/pipes.module';

//import { ConferenceData } from '../../providers/conference-data';

@NgModule({
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
export class NoticesPageModule {}
