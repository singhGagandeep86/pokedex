

function generateFirstTypeColour(strength, i) {
    document.getElementById(`strength${i}`).classList.add(`${strength}`);
    document.getElementById(`${i}`).classList.add(`${strength}` + 2);
}

function generateSecondTypeColour(i, pokemonAsJson) {
    if (pokemonAsJson['types'][1]) {
        let type = pokemonAsJson['types'][1]['type']['name'];
        document.getElementById(`weakness${i}`).classList.add(`${type}`);
    }
}

function firstGenerateTypeColour(strength, i) {
    document.getElementById(`strength_${i}`).classList.add(`${strength}`);
    document.getElementById(`card${i}`).classList.add(`${strength}` + 2);
}

function secondGenerateTypeColour(i, pokemonAsJson) {
    if (pokemonAsJson['types'][1]) {
        let type = pokemonAsJson['types'][1]['type']['name'];
        document.getElementById(`weakness_${i}`).classList.add(`${type}`);
    }
}