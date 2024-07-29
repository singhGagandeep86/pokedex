
function init() {
    render(1);
}

let base_Url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1302";

async function render(j) {
    for (let i = j; i < j + 40; i++) {
        let url = 'https://pokeapi.co/api/v2/pokemon/' + `${i}`;
        let pokemon = await fetch(url);
        let pokemonAsJson = await pokemon.json();
        let name = pokemonAsJson['forms'][0]['name'];
        generatePokemon(i, j, pokemonAsJson, name);
    }
}

async function generatePokemon(i, j, pokemonAsJson, name) {
    let strength = pokemonAsJson['types'][0]['type']['name'];
    let strengthHTML = `<div id="strength${i}" class="type">${strength}</div>`;
    let weaknessHTML = '';
    let main_Board = document.getElementById('mainBoard');
    if (pokemonAsJson['types'][1]) {
        let weakness = pokemonAsJson['types'][1]['type']['name'];
        weaknessHTML = `<div id="weakness${i}" class="type">${weakness}</div>`;
    }
    main_Board.innerHTML += `<div class="Card">
                                             <img class="img" id="image">Nr. ${i}<b>${name}</b>
                                              <div class="types">${strengthHTML}${weaknessHTML}</div>
                              </div>`;
    document.getElementById('load_Button').innerHTML = `<button onclick="loadMore(${j})">Mehr Pokémon laden</button>`;
    generateFirstTypeColour(strength, i);
    generateSecondTypeColour(i, pokemonAsJson);
}

function loadMore(j) {
    j = j + 40;
    let main_Board = document.getElementById('mainBoard');
    main_Board.innerHTML = '';
    render(j);
}
