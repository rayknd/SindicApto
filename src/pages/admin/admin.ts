import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController, MenuController, App } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AuthProvider } from '../../providers/usuarios/auth';
import { FirebaseProvider } from '../../providers/usuarios/firebase';
import { LoginPage } from '../login/login';
import { ListaCandidatosPage } from '../lista-candidatos/lista-candidatos';
import { RankingPage } from '../ranking/ranking';


@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  scannedCode = null;

  user={
    uid: '',
    nome: '',
    sobrenome: '',
    apartamento: '',
    bloco: '',
    email: '',
    desativado: false,
    votou: false,
    autorizado: false
  }


  constructor(public navCtrl: NavController, public navParams: NavParams,
     private barcode: BarcodeScanner, private firebase: FirebaseProvider,
     private toastCtrl: ToastController, private auth: AuthProvider,
     private loadingCtrl: LoadingController, private menuCtrl: MenuController,
     private alertCtrl: AlertController, private app: App) {
  }


  buscaDadosUsuarioAtual(keyUsuario: string) {
    console.log(keyUsuario + "  chave do user");
    this.firebase.buscaUsuarioAtual(keyUsuario)
      .subscribe(data => this.preencheDadosUsuario(data[0]));
  }

  preencheDadosUsuario(usuario) {
    console.log(usuario + "  preencheu");
    this.user = Object.assign(usuario);
  }

  validar(){
    
    this.barcode.scan()
    
    .then(barcodeData => {
        
      console.log(barcodeData.text + " barcode do usuario");


      console.log(JSON.parse(barcodeData.text));

      this.scannedCode = JSON.parse(barcodeData.text);
      
      console.log(this.scannedCode + " objeto escaneado");
      
      this.buscaDadosUsuarioAtual(this.scannedCode.uid);   
      
      console.log(this.user + " passou pelo busca");

      if(this.user.autorizado == false){

        let alerta = this.alertCtrl.create();
        
        alerta.setTitle('Autorizar');
        
        alerta.setSubTitle('Deseja validar este e-titulo?');
          
        alerta.addButton({
          text: 'Não'
        });
      
        alerta.addButton({
          text: 'Sim',
          handler: () => {
            
            this.user.autorizado = true;
            this.atualizaUsuario(); 
          }

        });
    
        alerta.present();
      }

      else{
        let alerta = this.alertCtrl.create();
          
        alerta.setTitle('Autoriza');
          
        alerta.setSubTitle('Usuário já autorizado');
          
        alerta.addButton({
          text: 'OK'
        });
    
        alerta.present();
      }  
    }, 
      
    (err) => {
      console.log('error: ', err);
    }); 
      
  }
  


  atualizaUsuario(){
    
    const loading = this.loadingCtrl.create();
    loading.setContent('Atualizando');
    loading.present();

    this.firebase.atualizaUsuarioAtual(this.user)
    .then(() => {
      loading.dismiss();
      this.criaToast('Dados atualizados com sucesso! ;)');
    })

    .catch(err => {
      loading.dismiss();
      this.criaToast('Houve um problema durante a gravação dos dados. Tente novamente.');
    });
  }
    
  criaToast(mensagem: string){
    let toast = this.toastCtrl.create();

    toast.setMessage(mensagem);
    toast.setDuration(3000);
    toast.setPosition('bottom');

    toast.present();
  }

  logoff(){
    this.auth.logout();
    this.menuCtrl.close();
    var nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
  }

  candidatos(){
    this.navCtrl.push(ListaCandidatosPage);
  }

  ranking(){
    this.navCtrl.push(RankingPage);
  }

}
