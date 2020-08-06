const coffees = [
    {
        name: "Cafeteria da Cidade",
        avatar: "https://s2.glbimg.com/BOo2uBTW_ghKO9vX6xkWLwFtVQE=/696x390/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2020/A/6/5aZNebQ1qUwUjiZdQRWg/capuccino.jpeg",
        whatsapp: "7999999911",
        bio: "O melhor Capuccino de Aracaju!",
        type: "Capuccino",
        cost: "3,50",
        weekday: [0, 6],
        time_from: [700],
        time_to: [1220]
    },
    {
        name: "Lanchonete do Seu Zé",
        avatar: "https://pbs.twimg.com/profile_images/1000319614960787456/TLJU1nal_400x400.jpg",
        whatsapp: "79959206832",
        bio: "Expresso fitness",
        type: "Expresso",
        cost: "2,50",
        weekday: [0, 6],
        time_from: [700],
        time_to: [1220]
    }
];

const subjects = [
    "Expresso",
    "Café com leite",
    "Capuccino",
    "Americano",
    "Ristretto",
    "Árabe",
    "Cremoso",
    "Macchiato"
];

const weekdays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
];

function getSubject(id){
    return subjects[+id-1];
}

function homePage(req, res){
    return res.render(__dirname + "/views/index.html");
}

function pagePedir(req, res){
    const filters = req.query;
    return res.render(__dirname + "/views/pedir.html", {coffees, filters, subjects, weekdays});
}

function pageEntregar(req, res){
    const data = req.query;
    if(JSON.stringify(Object.keys(data)) == JSON.stringify(Object.keys(coffees[0]))){
        data.type = getSubject(data.type);

        coffees.push(data);
        return res.redirect("/pedir");
    }
    return res.render(__dirname + "/views/entregar.html", {subjects, weekdays})
}

const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const { json } = require('express');

nunjucks.configure('src/views',{
    express: app,
    noCache: true,
});

app.use(express.static("public"));

app.get("/", homePage)
.get("/pedir", pagePedir)
.get("/entregar", pageEntregar);

app.listen(80);