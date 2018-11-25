import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class DatabaseProvider {
   constructor(private sqlite: SQLite) {}

    /**
     * Método responsável por criar a database, caso não exista.
     */
    public database() {
        return this.sqlite.create({
            name: 'usuario.db',
            location: 'default'
        });
    }

    /**
     * Método responsável por criar a estrutuda da database
     */
    public criaDatabase() {
        return this.database()
            .then((db: SQLiteObject) => {
                //Cria as tabelas
                this.criaTabelas(db);
                
            })
            .catch(e => console.log(e));
    } 

    /**
     * Cria a tabela para o bd
     * @param db 
     */
    private criaTabelas(db: SQLiteObject) {
        //Cria a tabela
        db.sqlBatch([
            ['CREATE TABLE IF NOT EXISTS usuario (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, key TEXT, dataExpiracao TEXT)']
        ]);
        console.log('Tabela criada');
    } 
}