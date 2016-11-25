import {Frontend} from "../Frontend/Frontend.interface";
import {DatabaseConnection} from "../Database/DatabaseConnection.interface";

import {DatabaseTable} from "../Database/DatabaseTable.interface";
import {DatabaseEvent} from "../Database/DatabaseEvent";

export class Room {
    readonly frontend: Frontend;
    readonly table: DatabaseTable;

    constructor(conn: DatabaseConnection, frontend: Frontend, table: DatabaseTable) {
        this.frontend = frontend;
        this.table = table;


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