import {Frontend} from "../Frontend/Frontend.interface";
import r = require('rethinkdb');
import {DatabaseConnection} from "../Database/DatabaseConnection.interface";

import {RethinkDbTable} from "../Database/RethinkDB/RethinkDbTable";
import {DatabaseTable} from "../Database/DatabaseTable.interface";
import {DatabaseEvent} from "../Database/DatabaseEvent";

export class ChatRoom {
    readonly frontend: Frontend;
    readonly table: DatabaseTable;

    constructor(conn: DatabaseConnection, frontend: Frontend) {
        this.frontend = frontend;
        this.table = new RethinkDbTable('chats');


        frontend.onConnect(async (socket) => {
            frontend.emit(new DatabaseEvent('value', await conn.query(this.table)));
        });

        frontend.onCreate((a) => {
            conn.create(this.table, a);
        });

        frontend.onUpdate((a) => {
            conn.update(this.table, a);
        });

        frontend.onDelete((a) => {
            conn.delete(this.table, a);
        });

        conn.onChange(this.table, (err, event) => {
            if (err) {
                return console.error(err);
            }

            frontend.emit(event);
        });
    }
}