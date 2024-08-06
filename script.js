
isAlreadyLoading = false;

async function init() {
    await pokemonsToArray();
    await render(1);
}

let pokemons = [];
let pokemonsNames = [];

let base_Url = "https://pokeapi.co/api/v2/pokemon?limit=1040&offset=0";


async function pokemonsToArray() {
    let pokedex = await fetch(base_Url);
    let pokedexAsJson = await pokedex.json();
    for (let i = 0; i < pokedexAsJson.results.length; i++) {
        pokemons.push(pokedexAsJson['results'][i]['url']);
        pokemonsNames.push(pokedexAsJson['results'][i]['name']);
    }
}

async function render(j) {
    let main_Board = document.getElementById('mainBoard');
    main_Board.innerHTML = '';
    for (let i = j; i < j + 40; i++) {
       await generatePokemon(i, j);
    }
}


async function generatePokemon(i, j) {
    let Selected_Board = document.getElementById('sel_Cardboard');
    Selected_Board.innerHTML = '';
    let pokemonUrl = pokemons[i - 1];
    let pokemon = await fetch(`${pokemonUrl}`);
    let pokemonAsJson = await pokemon.json();
    let mainPic = pokemonAsJson['sprites']['other']['official-artwork']['front_default'];
    let name = pokemonAsJson['forms'][0]['name'];
    let strength = pokemonAsJson['types'][0]['type']['name'];
    let strengthHTML = `<div id="strength${i}" class="type">${strength}</div>`;
    let weaknessHTML = '';
    let main_Board = document.getElementById('mainBoard');
    if (pokemonAsJson['types'][1]) {
        let weakness = pokemonAsJson['types'][1]['type']['name'];
        weaknessHTML = `<div id="weakness${i}" class="type">${weakness}</div>`;
    }
    main_Board.innerHTML += `<div class="Card" id="${i}" onclick="DetailedPokemon(${i}, ${j})">
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

async function DetailedPokemon(num, j) {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + `${num}`;
    let pokemon = await fetch(url);
    let pokemonAsJson = await pokemon.json();
    document.getElementById('body').style.height = "100vh";
    document.getElementById('body').style.overflow = "hidden";
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
    Selected_Board.style.display = "";
    Selected_Board.style.position = "fixed";
    Selected_Board.innerHTML = showSelectedPokemon(num, j, name, mainPic, strengthHTML, weaknessHTML);
    document.getElementById('sel_Cardboard').addEventListener('click', function (exit) {
        if (exit.target !== this)
            return;
        exitToMain();
    });
    document.getElementById(`info_${num}`).innerHTML = showAbout(num);
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

function showSelectedPokemon(num, j, name, mainPic, strengthHTML, weaknessHTML) {

    return `<div id="card${num}" class="detailedCard">
                <div class="heading">
                    <div class="pokName">${name}</div>
                </div>
                        <div class="pokemonMain"><b>#0${num}</b><img class="pok_big_img" id="image" src="${mainPic}">
                            <div class="character">${strengthHTML}${weaknessHTML}</div>
                         </div>
                                 <div class="stats">
                                     <div class="tabs">
                                             <div onclick="showAbout(${num})" class="tab">About</div>
                                             <div onclick="showAbilities(${num})" class="tab">Abilities</div>
                                             <div onclick="showStats(${num})" class="tab">Stats</div>
                                             <div onclick="showEvolution(${num})" class="tab">Evolution</div>
                                     </div>
                                <div class="navinfos">
                       <img class="navpre" id="preButton" onclick="previousPokemon(${num}, ${j})" src="./Images/Icon/navButton.png">
                             <div id="info_${num}"></div>
                       <img class="navnxt" onclick="nextPokemon(${num}, ${j})" src="./Images/Icon/navButton.png"></div>
              </div>`;

}

function previousPokemon(currentPokemon, start) {
    if (currentPokemon > start) {
        changedPokemon = currentPokemon - 1;
        DetailedPokemon(changedPokemon, start);
    }
}

function nextPokemon(currentPokemon, limit) {
    if (currentPokemon < limit + 39) {
        changedPokemon = currentPokemon + 1;
        DetailedPokemon(changedPokemon, limit);
    }
}

async function showAbout(currentPokemon) {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + `${currentPokemon}`;
    let pokemon = await fetch(url);
    let pokemonAsJson = await pokemon.json();
    let height = pokemonAsJson['height'];
    let weight = pokemonAsJson['weight'];
    let about = document.getElementById(`info_${currentPokemon}`);
    about.innerHTML = `<div class="showAbout"><h3>ABOUT</h3><b>Height :  ${height} cm</b><b>Weight : ${weight} gramm</b></div>`;
}

async function showAbilities(currentPokemon) {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + `${currentPokemon}`;
    let pokemon = await fetch(url);
    let pokemonAsJson = await pokemon.json();
    let info = document.getElementById(`info_${currentPokemon}`);
    info.innerHTML = `<div class="showAbout"><h3>ABILITIES</h3><ul id="listability"></ul></div>`;
    for (i = 0; i < pokemonAsJson['abilities'].length; i++) {
        let ability = pokemonAsJson['abilities'][i]['ability']['name'];
        document.getElementById('listability').style.color = "black";
        document.getElementById('listability').innerHTML += `<li>${ability}</li>`;
    }
}

async function showStats(currentPokemon) {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + `${currentPokemon}`;
    let pokemon = await fetch(url);
    let pokemonAsJson = await pokemon.json();
    let info = document.getElementById(`info_${currentPokemon}`);
    info.innerHTML = `<div class="showAbout"><h3>STATISTICS</h3><table id="listability"></table></div>`;
    let stat_1 = pokemonAsJson['stats'][0]['base_stat'];
    let stat_2 = pokemonAsJson['stats'][1]['base_stat'];
    let stat_3 = pokemonAsJson['stats'][2]['base_stat'];
    let stat_4 = pokemonAsJson['stats'][5]['base_stat'];
    let stat_5 = pokemonAsJson['stats'][3]['base_stat'];
    let stat_6 = pokemonAsJson['stats'][4]['base_stat'];
    document.getElementById('listability').innerHTML = showStatsData(stat_1, stat_2, stat_3, stat_4, stat_5, stat_6);
}


function showStatsData(hp, attack, defense, speed, special_attack, special_defense) {
    return `
             <tr><td>HP</td><td>: ${hp}<progress value="${hp}" max="120"></progress></td></tr>
             <tr><td>Attack</td><td>: ${attack} <progress value="${attack}" max="120"></progress></td></tr>
             <tr><td>Defense</td><td>: ${defense} <progress value="${defense}" max="120"></progress></td></tr>
             <tr><td>Speed</td><td>: ${speed} <progress value="${speed}" max="120"></progress></td></tr>
             <tr><td>special-attack</td><td>: ${special_attack} <progress value="${special_attack}" max="120"></progress></td></tr>
             <tr><td>Speed</td><td>: ${special_defense} <progress value="${special_defense}" max="120"></progress></td></tr>
    `;
}

async function showEvolution(currentPokemon) {
    let url = 'https://pokeapi.co/api/v2/pokemon-species/' + `${currentPokemon}`; 2
    let pokemon = await fetch(url);
    let pokemonAsJson = await pokemon.json();
    let evolution_chain_url = pokemonAsJson['evolution_chain']['url'];
    let evolution_chain = await fetch(evolution_chain_url);
    let evolution_chainAsJson = await evolution_chain.json();
    let evolution_1_UrlAsJson = await generateFirstEvolution(evolution_chainAsJson);
    let evolution_2_UrlAsJson = await generateSecondEvolution(evolution_chainAsJson);
    let evolution_3_UrlAsJson = await generateLastEvolution(evolution_chainAsJson);
    generateEvolution(currentPokemon, evolution_1_UrlAsJson, evolution_2_UrlAsJson, evolution_3_UrlAsJson);
}

async function generateFirstEvolution(evolution_chainAsJson) {
    if (evolution_chainAsJson['chain']){
    let evolution_1_url = evolution_chainAsJson['chain']['species']['url'];
    let evolution_1 = await fetch(evolution_1_url);
    let evolution_1_AsJson = await evolution_1.json();
    let evolution_1_mainUrl = evolution_1_AsJson['varieties'][0]['pokemon']['url'];
    let evolution_1_Url = await fetch(evolution_1_mainUrl);
    let evolution_1_UrlAsJson = await evolution_1_Url.json();
    return evolution_1_UrlAsJson;
}
else{
    console.error(`First Evolution not Found in Poke API`);
    return null;
}
}


async function generateSecondEvolution(evolution_chainAsJson) {
    if (evolution_chainAsJson['chain']['evolves_to'][0]['evolves_to'][0]) {
        let evolution_2_url = evolution_chainAsJson['chain']['evolves_to'][0]['evolves_to'][0]['species']['url'];
        let evolution_2 = await fetch(evolution_2_url);
        let evolution_2_AsJson = await evolution_2.json();
        let evolution_2_mainUrl = evolution_2_AsJson['varieties'][0]['pokemon']['url'];
        let evolution_2_Url = await fetch(evolution_2_mainUrl);
        let evolution_2_UrlAsJson = await evolution_2_Url.json();
        return evolution_2_UrlAsJson;
    }
    else {
        console.error(`Second Evolution not Found in Poke API`);
        return null;
    }

}

async function generateLastEvolution(evolution_chainAsJson) {
    if (evolution_chainAsJson['chain']['evolves_to'][0]['species']['url']) {
    let evolution_3_url = evolution_chainAsJson['chain']['evolves_to'][0]['species']['url'];
    let evolution_3 = await fetch(evolution_3_url);
    let evolution_3_AsJson = await evolution_3.json();
    let evolution_3_mainUrl = evolution_3_AsJson['varieties'][0]['pokemon']['url'];
    let evolution_3_Url = await fetch(evolution_3_mainUrl);
    let evolution_3_UrlAsJson = await evolution_3_Url.json();
    return evolution_3_UrlAsJson;
}
else {
    console.error(`Third Evolution not Found in Poke API`);
    return null;
}
}

function generateEvolution(main, evo_1, evo_2, evo_3) {
    if (evo_1 && evo_2 && evo_3)
    {
    let evolution_1_Pic = evo_1['sprites']['other']['official-artwork']['front_default'];
    let evolution_3_Pic = evo_2['sprites']['other']['official-artwork']['front_default'];
    let evolution_2_Pic = evo_3['sprites']['other']['official-artwork']['front_default'];
    let evolution_1_Name = evo_1['name'];
    let evolution_3_Name = evo_2['name'];
    let evolution_2_Name = evo_3['name'];
    let info = document.getElementById(`info_${main}`);
    info.innerHTML = `<div class="showAbout"><h3>Evolution Chain</h3><div id="evolution" class="evolutionChain"></div>`;
    document.getElementById('evolution').innerHTML = `<div class="evo_Poke"><img class="evoutionImage" src="${evolution_1_Pic}">${evolution_1_Name}</div>
                                                       <div class="evo_Poke"><img class="evoutionImage" src="${evolution_2_Pic}">${evolution_2_Name}</div>
                                                       <div class="evo_Poke"><img class="evoutionImage" src="${evolution_3_Pic}">${evolution_3_Name}</div>`;
} else
if (evo_1 && evo_3)
    {
    let evolution_1_Pic = evo_1['sprites']['other']['official-artwork']['front_default'];
    let evolution_2_Pic = evo_3['sprites']['other']['official-artwork']['front_default'];
    let evolution_1_Name = evo_1['name'];
    let evolution_2_Name = evo_3['name'];
    let info = document.getElementById(`info_${main}`);
    info.innerHTML = `<div class="showAbout"><h3>Evolution Chain</h3><div id="evolution" class="evolutionChain"></div>`;
    document.getElementById('evolution').innerHTML = `<div class="evo_Poke"><img class="evoutionImage" src="${evolution_1_Pic}">${evolution_1_Name}</div>
                                                       <div class="evo_Poke"><img class="evoutionImage" src="${evolution_2_Pic}">${evolution_2_Name}</div>`;
}
}

function exitToMain() {
    document.getElementById('sel_Cardboard').style.display = "none";
    document.getElementById('body').style.height = "";
    document.getElementById('body').style.overflow = "";
}

async function showSearch() {
    const searchValue = document.getElementById('input').value.toLowerCase();
    if (searchValue.length >= 3 && isAlreadyLoading == false) {
        isAlreadyLoading = true;
        const searchResults = pokemonsNames.filter(pokemon => pokemon.includes(searchValue));
        document.getElementById('mainBoard').innerHTML = '';
        for (const result of searchResults) {
            let index = pokemonsNames.findIndex(pokemon => pokemon.includes(result));
            if (index !== -1) {
                let newIndex = index + 1;
                await generateSearchedPokemon(newIndex, 1);
            }
        }
    }
    else if (searchValue.length == 0) {
        document.getElementById('sel_Cardboard').innerHTML = '';
        render(1);
    }
    isAlreadyLoading = false;
}

async function generateSearchedPokemon(i, j) {
    let Selected_Board = document.getElementById('sel_Cardboard');
    Selected_Board.innerHTML = '';
    let pokemonUrl = pokemons[i - 1];
    let pokemon = await fetch(`${pokemonUrl}`);
    let pokemonAsJson = await pokemon.json();
    let mainPic = pokemonAsJson['sprites']['other']['official-artwork']['front_default'];
    let name = pokemonAsJson['forms'][0]['name'];
    let strength = pokemonAsJson['types'][0]['type']['name'];
    let strengthHTML = `<div id="strength${i}" class="type">${strength}</div>`;
    let weaknessHTML = '';
    let main_Board = document.getElementById('mainBoard');
    if (pokemonAsJson['types'][1]) {
        let weakness = pokemonAsJson['types'][1]['type']['name'];
        weaknessHTML = `<div id="weakness${i}" class="type">${weakness}</div>`;
    }
    main_Board.innerHTML += `<div class="Card" id="${i}" onclick="DetailedPokemon(${i}, ${j})">
                                             <img class="img" id="image" src="${mainPic}">Nr. ${i}<b>${name}</b>
                                              <div class="types">${strengthHTML}${weaknessHTML}</div>
                              </div>`;
    document.getElementById('load_Button').innerHTML = '';
    generateFirstTypeColour(strength, i);
    generateSecondTypeColour(i, pokemonAsJson);
}