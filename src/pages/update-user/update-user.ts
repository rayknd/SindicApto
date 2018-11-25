import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { FirebaseProvider } from '../../providers/usuarios/firebase';
import { AuthProvider } from '../../providers/usuarios/auth';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'update-user',
  templateUrl: 'update-user.html',
})
export class UpdateUserPage {

  updateForm={
    uid: '',
    name: '',
    lastName: '',
    apartamento: '',
    bloco: '',
    email: '',
    desativado: false
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private usuarioProvider: UsuariosProvider, 
              private firebaseProvider: FirebaseProvider, private toastCtrl: ToastController,
              private loadingCtrl: LoadingController, private alertCtrl: AlertController,
              private auth: AuthProvider, private cdr: ChangeDetectorRef,
              private network: Network ) {
             // this.user = this.navParams.data.user || {};

  }

  ngAfterViewInit(){
    this.cdr.detectChanges();
  }

  ionViewDidLoad() {

    if(this.network.onConnect){
      this.buscaDadosUsuarioAtual(this.auth.getCurrentUser());
    }else{
      this.usuarioProvider.getIdUsuario()
      .then(data => {
        console.log(data);
        this.buscaDadosUsuarioAtual(data)
      })
      .catch(e => console.error(e));
    }
  }

  buscaDadosUsuarioAtual(keyUsuario: string) {
    console.log(keyUsuario);
    this.firebaseProvider.buscaUsuarioAtual(keyUsuario)
      .subscribe(data => this.preencheDadosUsuario(data[0]));
  }

  preencheDadosUsuario(usuario) {
    console.log(usuario);
    this.updateForm = Object.assign(usuario);
  }

  atualizaUsuario() {
    if(this.validaUpdate() == true){
    const loading = this.loadingCtrl.create();
    loading.setContent('Atualizando');
    loading.present();

    this.firebaseProvider.atualizaUsuarioAtual(this.updateForm)
      .then(() => {
        loading.dismiss();
        this.criaToast('Dados atualizados com sucesso! ;)');
       // this.navCtrl.setRoot(HomePage);
      })
      .catch(err => {
        loading.dismiss();
        this.criaToast('Houve um problema durante a gravação dos dados. Tente novamente.');
      });
    } else{
      this.criaToast('É necessário preencher todos os campos.');
    }
  }


  criaToast(mensagem: string){
    let toast = this.toastCtrl.create();

    toast.setMessage(mensagem);
    toast.setDuration(3000);
    toast.setPosition('bottom');

    toast.present();
  }


  validaUpdate(){
    if(this.updateForm.name == ""){ 
      this.criaToast('Favor informar um nome');
      return false }  
    else if (this.updateForm.lastName == ""){ 
      this.criaToast('Favor informar um sobrenome');
      return false }
    else if (this.updateForm.apartamento == ""){ 
      this.criaToast('Favor informar o apartamento');
      return false } 
    else if (this.updateForm.bloco == ""){ 
      this.criaToast('Favor informar o bloco');
      return false }
    else if (this.updateForm.email==""){ 
      this.criaToast('Favor informar o email');
      return false }
    else { return true; }
  }

  DesativarUsuario(){
    let alerta = this.alertCtrl.create();
    alerta.setTitle('Desativar Usuário');
    alerta.setSubTitle('Tem certeza disso?');
    alerta.addButton({
      text: 'Não'
    });
    alerta.addButton({
      text: 'Sim',
      handler: () => {
        this.updateForm.desativado = true;
        this.desativaUsuario();
      }
    });
    
    alerta.present();
  }

  desativaUsuario(){
    const loading = this.loadingCtrl.create();
    loading.setContent('Desativando usuário');
    loading.present();

    this.firebaseProvider.atualizaUsuarioAtual(this.updateForm)
      .then(() => {
        loading.dismiss();
        this.criaToast('Usuário desativado com sucesso!');
       // this.navCtrl.setRoot(HomePage);
      })
      .catch(err => {
        loading.dismiss();
        this.criaToast('Ocorreu um erro durante a desativação. Tente novamente.');
      });
  }

}