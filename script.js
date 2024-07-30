
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
    let mainPic = pokemonAsJson['sprites']['other']['official-artwork']['front_default'];
    let strength = pokemonAsJson['types'][0]['type']['name'];
    let strengthHTML = `<div id="strength${i}" class="type">${strength}</div>`;
    let weaknessHTML = '';
    let main_Board = document.getElementById('mainBoard');
    if (pokemonAsJson['types'][1]) {
        let weakness = pokemonAsJson['types'][1]['type']['name'];
        weaknessHTML = `<div id="weakness${i}" class="type">${weakness}</div>`;
    }
    main_Board.innerHTML += `<div class="Card" id="${i}">
                                             <img class="img" id="image" src="${mainPic}">Nr. ${i}<b>${name}</b>
                                              <div class="types">${strengthHTML}${weaknessHTML}</div>
                              </div>`;
    document.getElementById('load_Button').innerHTML = `<button onclick="loadMore(${j})">Mehr Pokémon laden</button>`;
    generateFirstTypeColour(strength, i);
    generateSecondTypeColour(i, pokemonAsJson);
}

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

function loadMore(j) {
    j = j + 40;
    let main_Board = document.getElementById('mainBoard');
    main_Board.innerHTML = '';
    render(j);
}
