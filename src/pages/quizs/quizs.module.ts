import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizsPage } from './quizs';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    QuizsPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizsPage),
    PipesModule
  ],
  exports:[
   QuizsPage
  ]
})
export class QuizsPageModule {}
