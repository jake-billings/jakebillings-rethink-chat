import {DatabaseConnection} from "../DatabaseConnection.interface";
import {Connection} from "rethinkdb";
import {DatabaseTable} from "../DatabaseTable.interface";
import r = require('rethinkdb');
import {DatabaseEvent} from "../DatabaseEvent";


export class RethinkDbConnection implements DatabaseConnection {
    conn: Connection;

    constructor(conn: Connection) {
        this.conn=conn;
    }

    async query (table: DatabaseTable) {
        let t = r.table(table.getName());
        let cursor = await t.run(this.conn);
        return cursor.toArray();
    }
    async create (table: DatabaseTable, target: any) {
        let t = r.table(table.getName());
        await t.insert(target).run(this.conn);
    }
    async update (table: DatabaseTable, target: any) {
        let t = r.table(table.getName());
        let row = t.filter(r.row('id').eq(target.id));
        await row.update(target).run(this.conn);
    }
    async delete (table: DatabaseTable, target: any) {
        let t = r.table(table.getName());
        let row = t.filter(r.row('id').eq(target.id));
        await row.delete().run(this.conn);
    }

    onChange (table: DatabaseTable, callback: Function) {
        let t = r.table(table.getName());
        t.changes().run(this.conn, function (err, cursor) {
            if (err) return callback(err);

            let row = cursor.each(function (err, row) {
                if (err) return callback(err);

                if (row.new_val) {
                    if (row.old_val) {
                        callback(null, new DatabaseEvent('update', row.new_val));
                    } else {
                        callback(null, new DatabaseEvent('create', row.new_val));
                    }
                } else {
                    callback(null, new DatabaseEvent('delete', row.old_val));
                }
            });
        });
    }
}