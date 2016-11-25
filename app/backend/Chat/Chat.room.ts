import {Frontend} from "../Frontend/Frontend.interface";
import {DatabaseConnection} from "../Database/DatabaseConnection.interface";

import {Room} from "../Room/Room";
import {DatabaseTable} from "../Database/DatabaseTable.interface";

export class ChatRoom extends Room {

    constructor(conn: DatabaseConnection, frontend: Frontend, table: DatabaseTable) {
        super(conn, frontend, table);
    }
}