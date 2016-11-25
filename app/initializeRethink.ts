import r = require('rethinkdb');
import {config} from "./config";

(async function () {
    let conn = await r.connect(config.rethinkDbConnectionOptions);

    let db = r.db('test');
    await db.tableCreate('User').run(conn);
    await db.tableCreate('Chat').run(conn);

    console.info('done.');
})();