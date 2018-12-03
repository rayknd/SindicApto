import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HeaderMenuComponent } from '../components/header-menu/header-menu';
import { Network } from '@ionic-native/network';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth'
import {AngularFirestoreModule} from 'angularfire2/firestore';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import {FirebaseProvider} from '../providers/usuarios/firebase';
import { AuthProvider } from '../providers/usuarios/auth';
import {SQLite} from '@ionic-native/sqlite';
import { DatabaseProvider } from './../providers/usuarios/database';
import { UsuariosProvider } from '../providers/usuarios/usuarios';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { LoginPage } from '../pages/login/login';
import { CadusuPage } from '../pages/cadusu/cadusu';
import { UpdateUserPage } from '../pages/update-user/update-user';
import { VotarPage } from '../pages/votar/votar';
import { ListaCandidatosPage } from '../pages/lista-candidatos/lista-candidatos';
import { CandidatoPage } from '../pages/candidato/candidato';
import { SortPipe } from '../pipes/sort/sort';
import { RankingPage } from '../pages/ranking/ranking';
import { AdminPage } from '../pages/admin/admin';
import { RecuperarPage } from '../pages/recuperar/recuperar';

export const firebaseConfig = {
  apiKey: "AIzaSyCDDlLX2JwVJ9Uww2bwer_S_CtFGS2x5m8",
  authDomain: "sindicapto.firebaseapp.com",
  databaseURL: "https://sindicapto.firebaseio.com",
  projectId: "sindicapto",
  storageBucket: "sindicapto.appspot.com",
  messagingSenderId: "924718836191"
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadusuPage,
    UpdateUserPage,
    HeaderMenuComponent,
    VotarPage,
    ListaCandidatosPage,
    CandidatoPage,
    SortPipe,
    RankingPage,
    AdminPage,
    RecuperarPage
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      autoFocusAssist: false
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgxQRCodeModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadusuPage,
    UpdateUserPage,
    VotarPage,
    ListaCandidatosPage,
    CandidatoPage,
    RankingPage,
    AdminPage, 
    RecuperarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    UsuariosProvider, 
    AuthProvider,
    FirebaseProvider,
    SQLite, 
    DatabaseProvider,
    BarcodeScanner,
    Network
    
  ]
})
export class AppModule {}


