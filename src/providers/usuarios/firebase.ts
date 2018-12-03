import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseProvider {
    constructor(private aFS: AngularFirestore) {}

    /**
     * Cria usuário na base firestore com os dados recebidos
     */
    gravaUsuario = data => 
        this.aFS
            .collection('Usuario')
            .doc(data.uid)
            .set(data);

    /**
     * Atualiza usuário na base firestore, com os dados recebidos
     */
    atualizaUsuarioAtual = data => 
        this.aFS
            .collection('Usuario')
            .doc(data.uid)
            .set(data);

    /**
     * Busca dados do usuário atual no firestore, com base na key(uid)
     */
    buscaUsuarioAtual = uid => {
        const collection: AngularFirestoreCollection<any> = this.aFS.collection(
            'Usuario',
            ref => ref.where('uid', '==', uid)
            
        ); 
        const collectionUsuario: Observable<any> = collection
            .snapshotChanges()
            .map(actions => {
                return actions.map(action => ({
                    ...action.payload.doc.data()
                }))
            })

            return collectionUsuario;
    }

    buscaCandidatos = () => {
        const candidato: AngularFirestoreCollection<any> = this.aFS.collection('candidatos');
        const collectionCandidato: Observable<any> = candidato
        .snapshotChanges()
        .map(actions => {
            return actions.map(action => ({
                ...action.payload.doc.data()
            }))
        })
        return collectionCandidato;
    }

    buscaCandidoAtual = uid => {
        const collection: AngularFirestoreCollection<any> = this.aFS.collection(
            "candidatos",
            ref => ref.where('uid', '==', uid)
            
        ); 
        const collectionUsuario: Observable<any> = collection
            .snapshotChanges()
            .map(actions => {
                return actions.map(action => ({
                    ...action.payload.doc.data()
                }))
            })

            return collectionUsuario;
    }


    //Atualiza o candidato
    atualizaCandidatoAtual = data => 
    this.aFS
        .collection('candidatos')
        .doc(data.uid)
        .set(data);
}