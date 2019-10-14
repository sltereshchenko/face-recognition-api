const db = require("knex")({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        port: 5432,
        user: "slava",
        password: "",
        database: "face-recognition"
    }
});

const saltRounds = 10;

const loginTable = "login";
const usersTable = "users";


module.exports = {
    db: db,
    saltRounds: saltRounds,
    loginTable: loginTable,
    usersTable: usersTable,
};



