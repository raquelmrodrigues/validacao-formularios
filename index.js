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

//rota principal
app.get("/", (req, res) => {
    res.render("index")
})

app.post("/form", (req, res) => {
    var {email, nome, pontos} = req.body;
    var emailError;
    var nomeError;

    if(email == undefined || email == "") {
        emailError = "E-mail não pode ser vazio";
    }

    if(nome == undefined || nome == "") {
        nomeError = "Nome não pode ser vazio";
    }

    if(emailError != undefined || nomeError != undefined) {
        res.redirect("/");
    } else {
        res.send("Funcrionou");
    }
})

app.listen(5678, (req,res) => {
    console.log("Servidor rodando");
})
