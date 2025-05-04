//1025 ao final da url indica o ultimo pokemon
const apiURL = "https://pokeapi.co/api/v2/pokemon?limit=1025";
const spriteURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

const grid = document.getElementById("grid");
const btCarregar = document.getElementById("btCarregar");

// pokemon que está carregando
let pokeAtual = 1;

//Pega o nome e url de todos os pokemons
let dados = await fetch(apiURL);
dados = await dados.json();

// quantidade de blocos que será adicionado ao atualizar
let qtdBlocos = 40;

//quantidade de 

function addPokemons() {
    for (let i = 0; i < qtdBlocos; i++) {
        grid.innerHTML += `<div class="blocoPokemon">
        <span class="idPokemon">#${pokeAtual}</span>
        <div class="baseSprite">
            <img src="${spriteURL + pokeAtual + ".png"}" loading="lazy" alt="sprite pokemon" class="sprite">
        </div>
        <a href="pokemon.html?pokemon=${pokeAtual}" class="nomePokemon">${dados.results[pokeAtual - 1].name}</a>
    </div>`;

    pokeAtual++;
    }
}

btCarregar.addEventListener("click", function () {
   addPokemons(); 
});

// Carrega os primeiros pokemons
addPokemons();
