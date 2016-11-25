import {DatabaseTable} from "../DatabaseTable.interface";

export class RethinkDbTable implements DatabaseTable {
    name: string;

    constructor (name: string) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}