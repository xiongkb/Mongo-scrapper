// requireing the dependencies
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

// initializing express
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// port
let PORT = 3000

// handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// connecting to routings and mongoDB
require("./routing/routes")(app);
mongoose.connect("mongodb://localhost/unit18Populator", {useNewUrlParser: true, useUnifiedTopology: true});


// listen
app.listen(PORT, function() {
    console.log("App listening on port " + PORT)
});