let fintechDb = {
    "isOK": true,
    "dbLenket": "",
    "dbNhcok": ""
}

console.log("[fintech_db] process.env.NODE_ENV: ", process.env.NODE_ENV);

switch (process.env.NODE_ENV) {
    case "development":
        console.log(">> development DB");
        fintechDb.dbLenket = require('./dev_db_lenket');
        fintechDb.dbNhcok = require('./dev_db_nhcok');
        break;
    case "production":
        console.log(">> production DB");
        fintechDb.isOK = false;
        break;
    default:
        console.log(">> None DB (You must set NODE_ENV)");
        fintechDb.isOK = false;
        break;
}

module.exports = fintechDb;