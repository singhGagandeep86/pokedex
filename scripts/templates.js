

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


function showStatsData(hp, attack, defense, speed, special_attack, special_defense) {
    return `
             <tr><td>HP</td><td> ${hp}<progress value="${hp}" max="120"></progress></td></tr>
             <tr><td>Attack</td><td> ${attack} <progress value="${attack}" max="120"></progress></td></tr>
             <tr><td>Defense</td><td> ${defense} <progress value="${defense}" max="120"></progress></td></tr>
             <tr><td>Speed</td><td> ${speed} <progress value="${speed}" max="120"></progress></td></tr>
             <tr><td>special-attack</td><td> ${special_attack} <progress value="${special_attack}" max="120"></progress></td></tr>
             <tr><td>Speed</td><td> ${special_defense} <progress value="${special_defense}" max="120"></progress></td></tr>
    `;
}


function addProperties(Selected_Board){
    document.getElementById('body').style.height = "100vh";
    document.getElementById('body').style.overflow = "hidden";
    Selected_Board.style.display = "flex";
}

function showDetailedCard(i, j, mainPic, name, strengthHTML, weaknessHTML){
    return `<div class="Card" id="${i}" onclick="DetailedPokemon(${i}, ${j})">
                                             <img class="img" id="image" src="${mainPic}">Nr. ${i}<b>${name}</b>
                                              <div class="types">${strengthHTML}${weaknessHTML}</div>
                              </div>`;
}