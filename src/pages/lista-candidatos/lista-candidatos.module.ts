import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaCandidatosPage } from './lista-candidatos';

@NgModule({
  declarations: [
    ListaCandidatosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaCandidatosPage),
  ],
})
export class ListaCandidatosPageModule {}
