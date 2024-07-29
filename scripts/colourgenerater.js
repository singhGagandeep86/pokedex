


function generateFirstTypeColour(strength, i) {
    if (strength === `grass`) {
        document.getElementById(`strength${i}`).style.backgroundColor = "green";
    }
    if (strength === `poison`) {
        document.getElementById(`strength${i}`).style.backgroundColor = "#b87fc8";
    }
    if (strength === `fire`) {
        document.getElementById(`strength${i}`).style.backgroundColor = "#fc7d24";
    }
    if (strength === `water`) {
        document.getElementById(`strength${i}`).style.backgroundColor = "#4591c3";
    }
    if (strength === `bug`) {
        document.getElementById(`strength${i}`).style.backgroundColor = "#729f3f";
    }
    if (strength === `flying`) {
        document.getElementById(`strength${i}`).style.backgroundColor = "#3dc7ef";
    }
    if (strength === `electric`) {
        document.getElementById(`strength${i}`).style.backgroundColor = "#edd435";
    }
    if (strength === `ground`) {
        document.getElementById(`strength${i}`).style.backgroundColor = "#aa9842";
    }
    if (strength === `fairy`) {
        document.getElementById(`strength${i}`).style.backgroundColor = "#fdb9e9";
    }
    if (strength === `dragon`) {
        document.getElementById(`strength${i}`).style.backgroundColor = "#f06e56";
    }
    if (strength === `spirit`) {
        document.getElementById(`strength${i}`).style.backgroundColor = "#7a61a3";
    }
    if (strength === `psychic`) {
        document.getElementById(`strength${i}`).style.backgroundColor = "#f265b9";
    }
    if (strength === `steel`) {
        document.getElementById(`strength${i}`).style.backgroundColor = "#9db7b7";
    }
    if (strength === `dark`) {
        document.getElementById(`strength${i}`).style.backgroundColor = "#707070";
    }
    if (strength === `fighting`) {
        document.getElementById(`strength${i}`).style.backgroundColor = "#d56623";
    }
    if (strength === `ice`) {
        document.getElementById(`strength${i}`).style.backgroundColor = "#51c4e7";
    }
    if (strength === `rock`) {
        document.getElementById(`strength${i}`).style.backgroundColor = "#a28c1f";
    }
    if (strength === `ghost`) {
        document.getElementById(`strength${i}`).style.backgroundColor = "#7b61a3";
    }
}


function generateSecondTypeColour(i, pokemonAsJson) {

    if (pokemonAsJson['types'][1] && pokemonAsJson['types'][1]['type']['name'] === `grass`) {
        document.getElementById(`weakness${i}`).style.backgroundColor = "green";
    }
    if (pokemonAsJson['types'][1] && pokemonAsJson['types'][1]['type']['name'] === `poison`) {
        document.getElementById(`weakness${i}`).style.backgroundColor = "#b87fc8";
    }
    if (pokemonAsJson['types'][1] && pokemonAsJson['types'][1]['type']['name'] === `fire`) {
        document.getElementById(`weakness${i}`).style.backgroundColor = "#fc7d24";
    }
    if (pokemonAsJson['types'][1] && pokemonAsJson['types'][1]['type']['name'] === `water`) {
        document.getElementById(`weakness${i}`).style.backgroundColor = "#4591c3";
    }
    if (pokemonAsJson['types'][1] && pokemonAsJson['types'][1]['type']['name'] === `bug`) {
        document.getElementById(`weakness${i}`).style.backgroundColor = "#729f3f";
    }
    if (pokemonAsJson['types'][1] && pokemonAsJson['types'][1]['type']['name'] === `flying`) {
        document.getElementById(`weakness${i}`).style.backgroundColor = "#3dc7ef";
    }
    if (pokemonAsJson['types'][1] && pokemonAsJson['types'][1]['type']['name'] === `electric`) {
        document.getElementById(`weakness${i}`).style.backgroundColor = "#edd435";
    }
    if (pokemonAsJson['types'][1] && pokemonAsJson['types'][1]['type']['name'] === `ground`) {
        document.getElementById(`weakness${i}`).style.backgroundColor = "#aa9842";
    }
    if (pokemonAsJson['types'][1] && pokemonAsJson['types'][1]['type']['name'] === `fairy`) {
        document.getElementById(`weakness${i}`).style.backgroundColor = "#fdb9e9";
    }
    if (pokemonAsJson['types'][1] && pokemonAsJson['types'][1]['type']['name'] === `dragon`) {
        document.getElementById(`weakness${i}`).style.backgroundColor = "#f06e56";
    }
    if (pokemonAsJson['types'][1] && pokemonAsJson['types'][1]['type']['name'] === `spirit`) {
        document.getElementById(`weakness${i}`).style.backgroundColor = "#7a61a3";
    }
    if (pokemonAsJson['types'][1] && pokemonAsJson['types'][1]['type']['name'] === `psychic`) {
        document.getElementById(`weakness${i}`).style.backgroundColor = "#f265b9";
    }
    if (pokemonAsJson['types'][1] && pokemonAsJson['types'][1]['type']['name'] === `steel`) {
        document.getElementById(`weakness${i}`).style.backgroundColor = "#9db7b7";
    }
    if (pokemonAsJson['types'][1] && pokemonAsJson['types'][1]['type']['name'] === `dark`) {
        document.getElementById(`weakness${i}`).style.backgroundColor = "#707070";
    }
    if (pokemonAsJson['types'][1] && pokemonAsJson['types'][1]['type']['name'] === `fighting`) {
        document.getElementById(`weakness${i}`).style.backgroundColor = "#d56623";
    }
    if (pokemonAsJson['types'][1] && pokemonAsJson['types'][1]['type']['name'] === `ice`) {
        document.getElementById(`weakness${i}`).style.backgroundColor = "#51c4e7";
    }
    if (pokemonAsJson['types'][1] && pokemonAsJson['types'][1]['type']['name'] === `rock`) {
        document.getElementById(`weakness${i}`).style.backgroundColor = "#a28c1f";
    }
    if (pokemonAsJson['types'][1] && pokemonAsJson['types'][1]['type']['name'] === `ghost`) {
        document.getElementById(`weakness${i}`).style.backgroundColor = "#7b61a3";
    }
}