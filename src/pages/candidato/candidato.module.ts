import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CandidatoPage } from './candidato';

@NgModule({
  declarations: [
    CandidatoPage,
  ],
  imports: [
    IonicPageModule.forChild(CandidatoPage),
  ],
})
export class CandidatoPageModule {}
