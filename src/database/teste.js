const database = require('./db');
const createCafezin = require('./createCafezin');

database.then(async (db) => {
    cafezinValue = {
        name: 'Cafeteria da Cidade',
        avatar: 'https://t2.rg.ltmcdn.com/pt/images/8/9/3/capuccino_cremoso_na_batedeira_7398_orig.jpg',
        whatsapp: '79940715739',
        bio: 'A melhor cafeteria de Aracaju!'
    };

    coffeeValue = {
        type: 1,
        cost: "3,50"
    };

    scheduleValue = [{
        weekday: 0,
        time_from: 700,
        time_to: 122000
    },
    {
        weekday: 1,
        time_from: 500,
        time_to: 122000
    }];

    await createCafezin(db, {cafezinValue, coffeeValue, scheduleValue});

    const result = await db.all(`
        SELECT coffees.*, cafezins.*
        FROM cafezins
        JOIN coffees ON (coffees.cafezin_id = cafezins.id)
        WHERE coffees.cafezin_id = 1
    `);

    const selectedTime = 800;

    const selectSchedules = await db.all(`
        SELECT *
        FROM schedule
        WHERE coffee_id = 1
        AND time_from <= ${selectedTime}
        AND time_to > ${selectedTime}
    `);

    console.log(selectSchedules);
});