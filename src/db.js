var sqlite3 = require("sqlite3").verbose();
const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if(err){
        console.error(err.message);
        throw err;
    } else {
        db.run(`
            CREATE TABLE IF NOT EXISTS Leaderboard(
                name varchar(32) not null,
                score int not null,
                created TEXT DEFAULT CURRENT_TIMESTAMP
            );
        `)
        db.run(`
            CREATE TABLE IF NOT EXISTS MultiplayerLeaderboard(
                name varchar(32) not null,
                score int not null,
                created TEXT DEFAULT CURRENT_TIMESTAMP
            );
        `)
    }
});

module.exports = db;