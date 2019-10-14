const {usersTable} = require("../constants/config");
const Clarifai = require('clarifai');


//You must add your own API key here from Clarifai: https://www.clarifai.com/
const app = new Clarifai.App({
    apiKey: 'YOUR_KEY'
});

const handleAPIClarifyCall = (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => res.json(data))
        .catch(err => res.status(500).json("Unable to work with Detect API"));
};

const handleImage = (db) => (req, res) => {
    const {id} = req.body;

    db(usersTable).where("id", "=", id).increment("entries", 1)
        .returning("entries").then(entries => res.json(entries[0]))
        .catch(err => res.status(400).json("Unable get entries"));
};

module.exports = {
    handleImage,
    handleAPIClarifyCall
};