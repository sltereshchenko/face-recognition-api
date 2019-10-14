const {usersTable} = require("../constants/config");

const handleProfile = (db) => (req, res) => {
    const {id} = req.params;
    db(usersTable).where("id", "=", id).then(user => {
        if (user.length) {
            return res.json(user[0]);
        } else {
            res.status(404).json("Not found");
        }
    }).catch(err => {
            res.status(400).json("Error getting user");
        }
    );

};

module.exports = {
    handleProfile
};