import * as data from '../data.js';
import * as dom from '../DOM.js';

//Atualiza os dados ao começar
let params = window.location.search;

let pokemon = null;

// se houver algum parametro, ele coloca o valor do parametro na variavel pokemon, caso contrario, define a variavel pokemon como 1
if (params.length > 1) {
    let dado = new URLSearchParams(params);
    pokemon = dado.get("pokemon");
}else{
    pokemon = 1;
}

//chama a função que atualiza os dados
await data.atualizarDados(pokemon);

//eventos

dom.btShiny.addEventListener("click", function() {
    data.shiny.isShiny = !data.shiny.isShiny;
    data.alterarSprite();
});

//adiciona um evento para cada elemento com a classe .seta

document.querySelectorAll(".seta").forEach(botao => {
    botao.addEventListener("click", () => {
        data.alterarPokemon(botao.value);
    })
});