
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
   // document.getElementById('sel_Cardboard').style.display = "";
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
    Selected_Board.innerHTML = showSelectedPokemon(num, name, mainPic, strengthHTML, weaknessHTML);
    document.getElementById('sel_Cardboard').addEventListener('click', function(exit) {
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

function showSelectedPokemon(num, name, mainPic, strengthHTML, weaknessHTML) {
    
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
                                             <div class="tab">Evolution</div>
                                     </div>
                                <div class="navinfos">
                       <img class="navpre" id="preButton" onclick="previousPokemon(${num})" src="./Images/Icon/navButton.png">
                             <div id="info_${num}"></div>
                       <img class="navnxt" onclick="nextPokemon(${num})" src="./Images/Icon/navButton.png"></div>
              </div>`;
              
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


function exitToMain(){
    console.log(`test`);
    document.getElementById('sel_Cardboard').style.display = "none";
    document.getElementById('body').style.height = "";
    document.getElementById('body').style.overflow = "";
}