const types = [
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

function getType(id){
    return types[+id-1];
}

function convertHoursToMinutes(hours){
    const [hour, minutes] = hours.split(':');
    return Number(hour * 60 + minutes);
}

module.exports = {
    types,
    weekdays,
    getType,
    convertHoursToMinutes
};