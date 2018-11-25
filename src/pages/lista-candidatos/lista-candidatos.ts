import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/usuarios/firebase';
import { CandidatoPage } from '../candidato/candidato';

@IonicPage()
@Component({
  selector: 'page-lista-candidatos',
  templateUrl: 'lista-candidatos.html',
})

export class ListaCandidatosPage {

  candidatos: Array<{nome: string, sobrenome: string, idade: number, apartamento: number,
     bloco: string, propostas: string, votos: number}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase: FirebaseProvider) {
  }

  ionViewDidLoad() {
    this.buscaDadosCandidatos();
  }

  buscaDadosCandidatos(){
    this.firebase.buscaCandidatos()
    .subscribe(data => {
      this.candidatos = Object.assign(data);
    });
  }

  goToPageCandidato(candidato: any){
    this.navCtrl.push(CandidatoPage, {candidato});
  }
}