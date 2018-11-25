import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/usuarios/firebase';


@IonicPage()
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
})
export class RankingPage {

  descending: boolean = false;
  order : number;
  column : string = 'votos';

  candidatos: Array<{nome: string, sobrenome: string, idade: number, apartamento: number,
    bloco: string, propostas: string, votos: number}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public firebase: FirebaseProvider) {
      this.sort();
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

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

}
