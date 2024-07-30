
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

function generatePokemon(i, j, pokemonAsJson, name) {
    let Selected_Board = document.getElementById('sel_Cardboard');
    Selected_Board.innerHTML = '';
    let mainPic = pokemonAsJson['sprites']['other']['official-artwork']['front_default'];
    let strength = pokemonAsJson['types'][0]['type']['name'];
    let strengthHTML = `<div id="strength${i}" class="type">${strength}</div>`;
    let weaknessHTML = '';
    let main_Board = document.getElementById('mainBoard');
    if (pokemonAsJson['types'][1]) {
        let weakness = pokemonAsJson['types'][1]['type']['name'];
        weaknessHTML = `<div id="weakness${i}" class="type">${weakness}</div>`;
    }
    main_Board.innerHTML += `<div class="Card" id="${i}" onclick="DetailedPokemon(${i})">
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

async function DetailedPokemon(num) {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + `${num}`;
    let pokemon = await fetch(url);
    let pokemonAsJson = await pokemon.json();
    let name = pokemonAsJson['forms'][0]['name'];
    let strength = pokemonAsJson['types'][0]['type']['name'];
    let strengthHTML = `<div id="strength_${num}" class="type">${strength}</div>`;
    let weaknessHTML = '';
    if (pokemonAsJson['types'][1]) {
        let weakness = pokemonAsJson['types'][1]['type']['name'];
        weaknessHTML = `<div id="weakness_${num}" class="type">${weakness}</div>`;
    }
    let mainPic = pokemonAsJson['sprites']['other']['official-artwork']['front_default'];
    let Selected_Board = document.getElementById('sel_Cardboard');
    Selected_Board.style.position = "fixed";
    Selected_Board.innerHTML = `<div id="card${num}" class="detailedCard"><div class="heading"><div class="pokName">${name}</div></div>
    <div class="pokemonMain"><b>#0${num}</b><img class="pok_big_img" id="image" src="${mainPic}"><div class="character">${strengthHTML}${weaknessHTML}</div></div>
    <div class="stats"><div class="tabs"><div onclick="showAbout(${num})" class="tab">About</div><div class="tab">Abilities</div><div class="tab">Stats</div><div class="tab">Evolution</div></div>
    <div class="navinfos"><img class="navpre" id="preButton" onclick="previousPokemon(${num})" src="./Images/Icon/navButton.png"><div id="info_${num}"></div><img class="navnxt" onclick="nextPokemon(${num})" src="./Images/Icon/navButton.png"></div>
    </div>`;
    firstGenerateTypeColour(strength, num);
    secondGenerateTypeColour(num, pokemonAsJson);
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

function previousPokemon(currentPokemon) {
        if (currentPokemon > 1) {
            changedPokemon = currentPokemon - 1;
            DetailedPokemon(changedPokemon);
        }
}

function nextPokemon(currentPokemon) {
    changedPokemon = currentPokemon + 1;
    DetailedPokemon(changedPokemon);
}

async function showAbout(currentPokemon){
    let url = 'https://pokeapi.co/api/v2/pokemon/' + `${currentPokemon}`;
    let pokemon = await fetch(url);
    let pokemonAsJson = await pokemon.json();
    let height = pokemonAsJson['height'];
    let weight = pokemonAsJson['weight'];
    let about = document.getElementById(`info_${currentPokemon}`);
    console.log(height + ` gramm`);
    about.innerHTML = `<h6>${height} cm</h6><br><h6>${weight} gramm</h6>`;
}