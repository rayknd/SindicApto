import {Injectable} from "@angular/core";
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AuthProvider {
    constructor(private afAuth: AngularFireAuth){}

    registro = (data) => this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password);

    login = (data) => this.afAuth.auth.signInWithEmailAndPassword(data.email, data.senha);
    
    recuperar = (data) => this.afAuth.auth.sendPasswordResetEmail(data.email);


    getCurrentUser(){
        return this.afAuth.auth.currentUser.uid;
    }



    logout(){
        this.afAuth.auth.signOut()
        .then(function(){
            console.log("Deslogado");
        }) .catch(function(error){
            console.log("Ocorreu um erro");
        });
      }
}

