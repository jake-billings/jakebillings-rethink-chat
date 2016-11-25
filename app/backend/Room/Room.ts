import {Frontend} from "../Frontend/Frontend";
import {DatabaseConnection} from "../Database/DatabaseConnection";

import {DatabaseTable} from "../Database/DatabaseTable";
import {DatabaseEvent} from "../Database/DatabaseEvent";
import {FrontendListener} from "../Frontend/FrontendListener";

export class Room implements FrontendListener {
    readonly frontend: Frontend;
    readonly table: DatabaseTable;
    readonly conn: DatabaseConnection;

    constructor(conn: DatabaseConnection, frontend: Frontend, table: DatabaseTable) {
        this.frontend = frontend;
        this.table = table;
        this.conn = conn;

        this.frontend.addFrontendListener(this);


        conn.onChange(this.table, (err, event) => {
            if (err) {
                return console.error(err);
            }

            this.frontend.emit(event);
        });
    }


    async onConnect(socket) {
        this.frontend.emit(new DatabaseEvent('value', await this.conn.query(this.table)));
    }

    onCreate(a) {
        this.conn.create(this.table, a);
    }

    onUpdate(a) {
        this.conn.update(this.table, a);
    }

    onDelete(a) {
        this.conn.delete(this.table, a);
    }

}