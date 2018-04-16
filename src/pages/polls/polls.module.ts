import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PollsPage } from './polls';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    PollsPage,
  ],
  imports: [
    IonicPageModule.forChild(PollsPage),
    PipesModule
  ],
  exports: [
    PollsPage
  ]
})
export class PollsPageModule {}
