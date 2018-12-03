import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/usuarios/auth';

@IonicPage()
@Component({
  selector: 'page-recuperar',
  templateUrl: 'recuperar.html',
})
export class RecuperarPage {

  loginForm= {
    email: ''
  } 

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperarPage');
  }

  enviar(){
    this.auth.recuperar(this.loginForm.email).then(function(){
      console.log('email enviado');
    }).catch(function(error){
      console.log("houve um problema ao enviar")
    });
  }

}
