var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var flash = require("express-flash")

app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use(flash());

app.listen(5678, (req,res) => {
    console.log("Servidor rodando");
})
