import {Frontend} from "../Frontend/Frontend";
import {DatabaseConnection} from "../Database/DatabaseConnection";

import {Room} from "../Room/Room";
import {DatabaseTable} from "../Database/DatabaseTable";

export class ChatRoom extends Room {

    constructor(conn: DatabaseConnection, frontend: Frontend, table: DatabaseTable) {
        super(conn, frontend, table);
    }
}