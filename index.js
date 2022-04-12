var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var flash = require("express-flash");
var cookieParser = require("cookie-parser");

app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// ativa cookie-parser
app.use(cookieParser("ygfdsahdfgdsyffas"))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(flash());

//rota principal
app.get("/", (req, res) => {

    var emailError = req.flash("emailError");
    var nomeError =  req.flash("nomeError");

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
    nomeError = (nomeError == undefined || nomeError.length == 0) ? undefined : nomeError;

    res.render("index", {emailError, nomeError});
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
        req.flash("emailError", emailError);
        req.flash("nomeError", nomeError);
        res.redirect("/");
    } else {
        res.send("Funcionou");
    }
})

app.listen(5678, (req,res) => {
    console.log("Servidor rodando");
})
