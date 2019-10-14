const {loginTable, usersTable} = require("../constants/config");

const handleSignIn = (db, bcrypt) => (req, res) => {
    const {email, password} = req.body;
    db(loginTable).select("email", "hash").where("email", "=", email)
        .then(data => {
            const isValidPassword = bcrypt.compareSync(password, data[0].hash);
            if (isValidPassword) {
                db(usersTable).select("*").where("email", "=", email)
                    .then(user => res.json(user[0]))
                    .catch(er => res.status(400).json("error logging in"));
            } else {
                res.status(401).json("Incorrect login or password")
            }
        }).catch(er => res.status(401).json("Incorrect login or password"));
};

module.exports = {
    handleSignIn
};