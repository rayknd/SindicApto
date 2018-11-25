import { Component } from '@angular/core';
import { NavController,  NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/usuarios/auth';
import { FirebaseProvider } from '../../providers/usuarios/firebase';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  qrData = null;
  createdCode = null;
  scannedCode = null;


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
              private auth: AuthProvider,
              private barcode: BarcodeScanner) { 
                  
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

      createCode(){
        this.createCode = this.qrData;
      }

      scanCode(){
        this.barcode.scan().then(barcodeData=>{
            this.scannedCode = barcodeData.text;
        }, (err) => {
          console.log('error: ', err);
        });
      }
}
