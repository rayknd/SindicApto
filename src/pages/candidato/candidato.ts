import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-candidato',
  templateUrl: 'candidato.html',
})
export class CandidatoPage {

  createdCode = null;
  candidato={
    uid: '',
    nome: '',
    sobrenome: '',
    idade: 0,
    apartamento: 0,
    bloco: '',
    propostas: '',
    votos: 0,
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.candidato = this.navParams.data.candidato;
  }

  ionViewDidLoad() {
    console.log(this.candidato);
    this.geraQrCode(this.candidato);
  }

  geraQrCode(candidato){
    let txtCode = {
      uid: candidato.uid,
      nome: candidato.nome,
      sobrenome: candidato.sobrenome,
      idade: candidato.idade,
      apartamento: candidato.apartamento,
      bloco: candidato.bloco,
      propostas: candidato.propostas,
      votos: candidato.votos
    };
    this.createdCode = JSON.stringify(txtCode);
  }

}
