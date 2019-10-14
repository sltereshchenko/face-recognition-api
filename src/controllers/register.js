const {saltRounds, loginTable, usersTable} = require("../constants/config");

const handleRegister = (db, bcrypt) => (req, res) => {
    const {email, name, password} = req.body;
    if (email && password) {
        const hash = bcrypt.hashSync(password, saltRounds);
        db.transaction(trx => {
            trx(loginTable).insert({
                email: email,
                hash: hash,
            }).returning("email").then(email => {
                return trx(usersTable).returning("*").insert({
                    name: name,
                    email: email[0],
                    entries: 0,
                    joined: new Date()
                }).then(user => res.json(user[0]))


            }).then(trx.commit)
                .catch(trx.rollback);
        })
            .catch(err => res.status(400).json("Unable to register"));
    } else {
        res.status(400).json("Required fields are empty")
    }
};

module.exports = {
    handleRegister
};