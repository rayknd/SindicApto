import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import {AuthProvider} from '../../providers/usuarios/auth';
import { CadusuPage } from '../cadusu/cadusu';
import {HomePage} from '../home/home';
import {UsuariosProvider} from '../../providers/usuarios/usuarios';
import { AdminPage } from '../admin/admin';
import { RecuperarPage } from '../recuperar/recuperar';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  
  loginForm= {
    email: '',
    senha: ''
  } 
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private auth: AuthProvider, private load: LoadingController, 
              private toast: ToastController, private usuarios: UsuariosProvider){

  }
  
  loginUser(){
    if(this.validaLogin()){
      const loading = this.load.create();
      loading.setContent('Entrando...');
      loading.present();

      if(this.loginForm.email == "admin@admin.com"){
        this.auth.login(this.loginForm).then((res)=>{
        
        this.criaToast('Bem-vindo!')
        this.navCtrl.setRoot(AdminPage);
        
        loading.dismiss();

        })
        .catch((err) =>{
          loading.dismiss();
          if(err.code === "auth/user-not-found") this.criaToast('Usuário não encontrado.');
          if(err.code === "auth/wrong-password") this.criaToast('Senha incorreta.');
          if(err.code === "auth/invalid-email")  this.criaToast('E-mail inválido');
          console.log(err)
  
        });
        
      }else{
      this.auth.login(this.loginForm)
      .then((res) =>{
        loading.dismiss();
        this.gravaKey(res.user.uid);
        
      })
      .catch((err) =>{
        loading.dismiss();
        if(err.code === "auth/user-not-found") this.criaToast('Usuário não encontrado.');
        if(err.code === "auth/wrong-password") this.criaToast('Senha incorreta.');
        if(err.code === "auth/invalid-email")  this.criaToast('E-mail inválido');
        console.log(err)

      });
    }
    } else{
      this.criaToast('Informe seu e-mail e senha para logar');
    }
  }

  criaToast(mensagem: string){
    let toast = this.toast.create();
    toast.setMessage(mensagem);
    toast.setDuration(3000);
    toast.setPosition('bottom');
    toast.present();
  }

  validaLogin(){
    if((this.loginForm.email == "") || (this.loginForm.senha == "")) return false;
    else return true;
  }

  gravaKey(keyUsuario) {
    const usuario = {
      key: keyUsuario,
      data: new Date()
    }
    this.usuarios.insertUsuario(usuario)
      .then(() => {
        this.criaToast('Bem-vindo!')
        this.navCtrl.setRoot(HomePage);
      })
      .catch((err) => {
        this.criaToast('Não foi possível acessar o aplicativo. Tente novamente.')
      });
  }

  goToPageRegister(){
    this.navCtrl.push(CadusuPage);
  }

  
  recuperar(){
    this.navCtrl.push(RecuperarPage);
  } 

}