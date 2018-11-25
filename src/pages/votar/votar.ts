import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController,LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AuthProvider } from '../../providers/usuarios/auth';
import { FirebaseProvider } from '../../providers/usuarios/firebase';

@IonicPage()
@Component({
  selector: 'page-votar',
  templateUrl: 'votar.html',
})
export class VotarPage {

  
  createdCode = null;
  scannedCode = null;

  user={
    uid: '',
    nome: '',
    sobrenome: '',
    apartamento: '',
    bloco: '',
    votou: false
  }

  candidato={
    uid: '',
    nome: '',
    sobrenome: '',
    idade: 0,
    apartamento: '',
    bloco: '',
    propostas: '',
    votos: 0
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
                      private auth: AuthProvider, private firebase: FirebaseProvider, 
                      private barcode: BarcodeScanner, private toastCtrl: ToastController,
                      private loadingCtrl: LoadingController,
                      private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.buscaDadosUsuarioAtual(this.auth.getCurrentUser());
  }

  buscaDadosUsuarioAtual(keyUsuario: string) {
    console.log(keyUsuario);
    this.firebase.buscaUsuarioAtual(keyUsuario)
      .subscribe(data => this.preencheDadosUsuario(data[0]));
  }

  preencheDadosUsuario(usuario) {
    console.log(usuario);
    this.user = Object.assign(usuario);
    this.geraQrCode(this.user);
  }

  geraQrCode(user){
    let txtCode = {
      id: user.uid,
      nome: user.nome,
      sobrenome: user.sobrenome,
      apartamento: user.apartamento,
      bloco: user.bloco,
      votou: false
    };
    this.createdCode = JSON.stringify(txtCode);
  }

  votar(){
    if(this.user.votou == false){
      
      this.barcode.scan()
      .then(barcodeData => {
        
        this.scannedCode = JSON.parse(barcodeData.text);

        this.buscaCandidato(this.scannedCode.uid);
        
        let alerta = this.alertCtrl.create();
        
        alerta.setTitle('Votar');
        
        alerta.setSubTitle('Confirma seu voto?');
          
        alerta.addButton({
          text: 'Não'
        });
      
        alerta.addButton({
          text: 'Sim',
          handler: () => {
            this.candidato.votos = this.candidato.votos + 1;
            console.log("Voto candidato: " + this.candidato.votos );
            this.atualizaCandidato();
          
            this.user.votou = true;
            this.atualizaUsuario(); 
          }

        });
    
        alerta.present();
      
      }, 
      
      (err) => {
        console.log('error: ', err);
        }); 
    }
    
    else{
      let alerta = this.alertCtrl.create();
      
      alerta.setTitle('Votar');
      
      alerta.setSubTitle('Você já votou!');
      
      alerta.addButton({
          text: 'OK'
      });

      alerta.present();
    }

  }

  atualizaUsuario() {
    
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

  buscaCandidato(uidCandidato){
    this.firebase.buscaCandidoAtual(uidCandidato)
      .subscribe(data => {
        console.log('candidato: ',data)
        this.preencheDadosCandidato(data[0])
      });;
  }

  preencheDadosCandidato(candidato) {
    console.log("Dados do candidato: "+candidato);
    this.candidato = Object.assign(candidato);
  }
  
  criaToast(mensagem: string){
    let toast = this.toastCtrl.create();

    toast.setMessage(mensagem);
    toast.setDuration(3000);
    toast.setPosition('bottom');

    toast.present();
  }

  atualizaCandidato(){
    const loading = this.loadingCtrl.create();
    loading.setContent('Atualizando');
    loading.present();

    this.firebase.atualizaCandidatoAtual(this.candidato)
      .then(() => {
        loading.dismiss();
        this.criaToast('Voto computado com sucesso!');
      })
      .catch(err => {
        loading.dismiss();
        this.criaToast('Houve um problema durante a gravação dos dados. Tente novamente.');
      });
  }

}
