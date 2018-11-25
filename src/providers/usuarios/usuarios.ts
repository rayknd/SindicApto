import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../usuarios/database';

@Injectable()
export class UsuariosProvider {
    
    constructor(private dbProvider: DatabaseProvider) {}

    /**
     * Responsável por gravar o identificador do usuário (uid) no SQLite para acesso rápido
     * @param usuario objeto contendo uid e data de cadastro da key(no SQLite)
     */
    public insertUsuario(usuario) {
        return this.dbProvider.database()
            .then((db: SQLiteObject) => {
                let sql = 'INSERT INTO usuario (key, dataExpiracao) VALUES (?, ?)';
                let data = [usuario.key, usuario.data];

                return db.executeSql(sql, data)
                    .then(data => console.log('Inseriu a key do usuário', usuario.key))
                    .catch((err) => console.error(err));
            })
            .catch((e) => console.error(e));
    } 

    /**
     * Atualiza os dados do usuário
     * @param usuario objeto contendo data e key(uid) do usuário
     */
    public updateUsuario(usuario) {
        return this.dbProvider.database()
            .then((db: SQLiteObject) => {
                let sql = 'update usuario set dataExpiracao = ? where key = ?';
                let data = [usuario.data, usuario.key];

                return db.executeSql(sql, data)
                    .catch((err) => console.error(err));
            })
            .catch((e) => console.error(e));
    } 

    /**
     * Responsável por deletar o usuário do SQLite, quando o logout é realizado
     * @param keyUsuario uid do usuário
     */
    public removeUsuario(keyUsuario) {
        return this.dbProvider.database()
            .then((db: SQLiteObject) => {
                let sql = "delete from usuario where key = ?";
                let data = [keyUsuario];

                return db.executeSql(sql, data)
                    .catch((err) => console.error(err));
            })
            .catch((e) => console.error(e));
    }

    /**
     * Busca no SQLite os dados gravados com base na key fornecida
     * @param keyUsuario uid do usuário
     */
    public getUsuario(keyUsuario) {
        return this.dbProvider.database()
            .then((db: SQLiteObject) => {
                let sql = "select * from usuario where key = ?";
                let data = [keyUsuario];

                return db.executeSql(sql, data)
                    .then((data: any) => {
                        //Caso haja algum usuário cadastradono banco.
                        if(data.rows.length > 0) {
                            let item = data.rows.item(0);
                            //Adiciona dados ao objeto de usuário
                            const usuario = new Usuario();
                            usuario.id = item.id;
                            usuario.key = item.key;
                            usuario.dataExpiracao = item.dataExpiracao;

                            return usuario;
                        }

                        //Não tem nenhum usuário no banco.
                        return null;
                    })
                    .catch((err) => console.error(err));
            })
            .catch((err) => console.log(err));
    } 

    /**
     * Verifica se há algum registro de usuário cadastrado. Caso exista, retorna a key através de uma promise
     */
    public getIdUsuario() {
        return this.dbProvider.database()
            .then((db: SQLiteObject) => {
                let sql = "select key from usuario";

                return db.executeSql(sql, [])
                    .then((data: any) => {
                        //Caso haja algum usuário cadastradono banco.
                        if(data.rows.length > 0) {
                            const tamanhoArray = data.rows.length;
                            let item = data.rows.item(tamanhoArray-1);
                            return item.key;
                        }

                        //Não tem nenhum usuário no banco.
                        return null;
                    })
                    .catch((err) => console.error(err));
            })
            .catch((err) => console.log(err));
    } 
}

export class Usuario {
    id: number;
    key: string;
    dataExpiracao: Date;
}