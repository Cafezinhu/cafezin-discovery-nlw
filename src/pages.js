const database = require('./database/db');
const { types, weekdays, getType, convertHoursToMinutes } = require('./utils/format');

function homePage(req, res){
    return res.render("index.html");
}

async function pagePedir(req, res){
    const filters = req.query;

    if(!filters.type || !filters.weekday || !filters.time){
        return res.render("pedir.html", {filters, types, weekdays});
    }
    const time = convertHoursToMinutes(filters.time);
    const query = `
        SELECT coffees.*, cafezins.*
        FROM cafezins
        JOIN coffees ON (coffees.cafezin_id = cafezins.id)
        WHERE EXISTS (
            SELECT *
            FROM schedule
            WHERE coffee_id = coffees.id
            AND weekday = ${filters.weekday}
            AND time_from <= ${time}
            AND time_to > ${time}
        )
        AND coffees.type = '${filters.type}'
    `;
    try {
        const db = await database;
        const coffees = await db.all(query);

        coffees.map(coffee =>{
            coffee.type = getType(coffee.type)
        })

        return res.render("pedir.html", {coffees, filters, types, weekdays});
    } catch (error) {
        console.log(error);
    }
}

function pageEntregar(req, res){
    return res.render("entregar.html", {types, weekdays})
}

async function saveEntregarForm(req, res){
    const createCafezin = require('./database/createCafezin');
    const data = req.body;

    const cafezinValue = {
        name: data.name,
        avatar: data.avatar,
        whatsapp: data.whatsapp,
        bio: data.bio
    }

    const coffeeValue = {
        type: data.type,
        cost: data.cost
    }

    const scheduleValue = data.weekday.map((weekday, index) => {
        return {
            weekday: weekday,
            time_from: convertHoursToMinutes(data.time_from[index]),
            time_to: convertHoursToMinutes(data.time_to[index])
        };
    });

    try {
        const db = await database;
        await createCafezin(db, {cafezinValue, coffeeValue, scheduleValue});
        let queryString = `?type=${data.type}&weekday=${data.weekday[0]}&time=${data.time_from[0]}`;
        return res.redirect("/pedir" + queryString);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { homePage, pageEntregar, pagePedir, saveEntregarForm };