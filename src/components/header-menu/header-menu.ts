import { Component, ViewChild } from '@angular/core';
import { App, Nav, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/usuarios/auth';
import { LoginPage } from '../../pages/login/login';
import { HomePage } from '../../pages/home/home';
import { UpdateUserPage } from '../../pages/update-user/update-user';
import { VotarPage } from '../../pages/votar/votar';
import { ListaCandidatosPage } from '../../pages/lista-candidatos/lista-candidatos';
import { RankingPage } from '../../pages/ranking/ranking';

@Component({
  selector: 'header-menu',
  templateUrl: 'header-menu.html'
})
export class HeaderMenuComponent {
  
  @ViewChild(Nav) nav: Nav;
  pages: Array<{titulo: string, component: any}>;

  constructor(public auth: AuthProvider, public menuCtrl: MenuController, public app: App) {

    this.pages = [
      {titulo: 'Home', component: HomePage},
      {titulo: 'Meu Perfil', component: UpdateUserPage},
      {titulo: 'Candidatos', component: ListaCandidatosPage},
      {titulo: 'Ranking', component: RankingPage},
      {titulo: 'Votar', component: VotarPage}
    ];
  }

  openPage(page){
    var nav = this.app.getRootNav();
    nav.setRoot(page.component);
  }

  logout(){
    console.log("Logout");
    this.auth.logout();
    this.menuCtrl.close();
    var nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
  }

}
