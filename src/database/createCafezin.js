module.exports = async function(db, {cafezinValue, coffeeValue, scheduleValue}){
    const insertedCafezin = await db.run(`
        INSERT INTO cafezins (
            name, 
            avatar, 
            whatsapp, 
            bio
        ) VALUES (
            "${cafezinValue.name}", 
            "${cafezinValue.avatar}", 
            "${cafezinValue.whatsapp}", 
            "${cafezinValue.bio}"
        );
    `);

    const cafezinId = insertedCafezin.lastID;

    const insertedCoffee = await db.run(`
            INSERT INTO coffees (
                type, 
                cost, 
                cafezin_id
            ) VALUES (
                "${coffeeValue.type}", 
                "${coffeeValue.cost}", 
                ${cafezinId}
            );
    `);

    const coffeeId = insertedCoffee.lastID;

    const insertedSchedules = scheduleValue.map(schedule => {
        return db.run(`
            INSERT INTO schedule (coffee_id, weekday, time_from, time_to) 
            VALUES (${coffeeId}, ${schedule.weekday}, ${schedule.time_from}, ${schedule.time_to});
        `);
    });

    await Promise.all(insertedSchedules);
}