const bodyParser = require("body-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const image = require("./controllers/image");
const profile = require("./controllers/profile");
const {db} = require("./constants/config");


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.send("Server is running"));
app.get("/profile/:id", profile.handleProfile(db));
app.put("/image", image.handleImage(db));
app.post("/imageurl", image.handleAPIClarifyCall);
app.post("/signin", signin.handleSignIn(db, bcrypt));
app.post("/register", register.handleRegister(db, bcrypt));


app.listen(process.env.PORT || 3001, () => {
    console.log("App is running!");
});