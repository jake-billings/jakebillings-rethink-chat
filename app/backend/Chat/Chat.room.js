"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const RethinkDbTable_1 = require("../Database/RethinkDB/RethinkDbTable");
const DatabaseEvent_1 = require("../Database/DatabaseEvent");
class ChatRoom {
    constructor(conn, frontend) {
        this.frontend = frontend;
        this.table = new RethinkDbTable_1.RethinkDbTable('chats');
        frontend.onConnect((socket) => __awaiter(this, void 0, void 0, function* () {
            frontend.emit(new DatabaseEvent_1.DatabaseEvent('value', yield conn.query(this.table)));
        }));
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
exports.ChatRoom = ChatRoom;
//# sourceMappingURL=Chat.room.js.map