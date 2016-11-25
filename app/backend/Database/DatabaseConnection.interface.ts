import {DatabaseTable} from "./DatabaseTable.interface";

export interface DatabaseConnection {
    query: (table: DatabaseTable) => Promise<Array<any>>;
    create: (table: DatabaseTable, target: any) => void;
    update: (table: DatabaseTable, target: any) => void;
    delete: (table: DatabaseTable, target: any) => void;

    onChange: (table: DatabaseTable, callback: Function) => void;
}