const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const { homePage, pageEntregar, pagePedir, saveEntregarForm } = require('./pages');

nunjucks.configure('src/views',{
    express: app,
    noCache: true,
});

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", homePage)
.get("/pedir", pagePedir)
.get("/entregar", pageEntregar)
.post("/save-form", saveEntregarForm);

app.listen(80);