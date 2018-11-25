import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { LoginPage }from '../login/login';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthProvider } from '../../providers/usuarios/auth';
import { FirebaseProvider } from '../../providers/usuarios/firebase';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-cadusu',
  templateUrl: 'cadusu.html',
})
export class CadusuPage {
  title: string;
  form: FormGroup;
  user: any;
  createdCode = null;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder, private firebase: FirebaseProvider,
              private toast: ToastController, private auth: AuthProvider,
              private load: LoadingController,
              public barcode: BarcodeScanner,
              public usuariosProvider: UsuariosProvider) {
                this.user = this.navParams.data.user || {};
                this.createForm();
                this.setUpPage();
                
  }

  goToLoginPage(){
    this.navCtrl.push(LoginPage);
  }

  setUpPage(){
    this.title = this.navParams.data.user ? 'Alterar Dados' : "Cadastre-se";
  }

  createForm(){
    this.form = this.formBuilder.group({
      key: [this.user.key],
      name: [this.user.name, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      apartamento: [this.user.apartamento, Validators.required],
      bloco: [this.user.bloco, Validators.required],
      email: [this.user.email, Validators.required],
      password: [this.user.password, /*Validators.compose([Validators.minLength(6)]), 
        Validators.compose([Validators.maxLength(20)]), */ Validators.required],
      desativado: false  
    });
  }


  registraUsuario(){
    
    if(this.form.valid){
      const loading = this.load.create();
      loading.setContent('Cadastrando...');
      loading.present();

      this.auth.registro(this.form.value)
      .then((res) => {
        //id único do usuário
        let uid = res.user.uid;

        //Dados que serão salvos no firestone
        let informacoesUsuario = {
          uid: uid,
          nome: this.form.value.name,
          sobrenome: this.form.value.lastName,
          email: this.form.value.email,
          apartamento: this.form.value.apartamento,
          bloco: this.form.value.bloco,
          desativado: this.form.value.desativado
        };

        //Grava uid e data no sqLite
        this.usuariosProvider.insertUsuario(this.form);

        //Grava dados no Firestore
        this.firebase.gravaUsuario(informacoesUsuario)
        .then(() => {
          loading.dismiss();
          this.criaToast('Cadastro feito com sucesso!');
          this.goToLoginPage();  
        })
        
        .catch(err => {
          loading.dismiss();
          this.criaToast('Houve algum problema durante o cadastro. ;/ \n Tente novamente.');
            console.log('Erro gravacao firestore', err)
        });
            
      })
      
      .catch(err => {
        console.log(err);
      }) 
    }
  }

  criaToast(mensagem: string){
    let toast = this.toast.create();

    toast.setMessage(mensagem);
    toast.setDuration(3000);
    toast.setPosition('top');

    toast.present();
  }

}
