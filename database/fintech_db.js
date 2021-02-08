const fintechDb = {
    "isOK": true,
    "dbLenket": "",
    "dbNhcok": ""
}

switch (process.env.NODE_ENV) {
    case "development":
        fintechDb.dbLenket = require('./dev_db_lenket');
        fintechDb.dbNhcok = require('./dev_db_nhcok');
        break;
    case "production":
        fintechDb.isOK = false;
        break;
    default:
        fintechDb.isOK = false;
        break;
}

module.exports = fintechDb;