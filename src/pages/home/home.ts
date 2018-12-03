import { Component } from '@angular/core';
import { NavController,  NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/usuarios/auth';
import { FirebaseProvider } from '../../providers/usuarios/firebase';
import { ListaCandidatosPage } from '../lista-candidatos/lista-candidatos';
import { RankingPage } from '../ranking/ranking';
import { VotarPage } from '../votar/votar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {


  user={
    uid: '',
    name: '',
    lastName: '',
    apartamento: '',
    bloco: '',
    email: '',
    desativado: false
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public firebase:AuthProvider,
              private firebaseProvider: FirebaseProvider,
              private auth: AuthProvider) { 
                  
  }

  ionViewDidLoad(){
    this.buscaDadosUsuarioAtual(this.auth.getCurrentUser());
  } 
  
  buscaDadosUsuarioAtual(keyUsuario: string) {
    console.log(keyUsuario);
    this.firebaseProvider.buscaUsuarioAtual(keyUsuario)
      .subscribe(data => this.preencheDadosUsuario(data[0]));
  }
    
  preencheDadosUsuario(usuario) {
    console.log(usuario);
    this.user = Object.assign(usuario);
  }

  candidatos(){
    this.navCtrl.push(ListaCandidatosPage);
  }

  ranking(){
    this.navCtrl.push(RankingPage);
  }

  votar(){
    this.navCtrl.push(VotarPage);
  }

}
