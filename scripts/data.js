import * as dom from './DOM.js';
import * as style from './scriptsStyles.js';

const url = "https://pokeapi.co/api/v2/pokemon/";
const urlDescricao = "https://pokeapi.co/api/v2/pokemon-species/";

//Shiny
let shiny = {
    isShiny: false
};
let spritesShiny = [null,null]

//retorna os dados
export async function getDados(pokemon) {
    let dados = await fetch(url + pokemon);
    dados = await dados.json();
    
    return dados;
}

//retorna a descricao
export async function getDescricao(pokemon) {
    let dados = await fetch(urlDescricao + pokemon);
    dados = await dados.json();

    //coloca os dados de todas as descroções dentro da variavel descricoes
    let descricoes = dados.flavor_text_entries;

    //deixa um valor padrão na descricao
    let descricao = descricoes[0].flavor_text;
    
    //percorre o array de tras pra frente, ao encontrar uma descricao com a linguagem em en, passa a descricao para a variavel "descricao" e para o loop

    for (let i = descricoes.length - 1; i >= 0 ;i--) {
        if (descricoes[i].language.name === "en") {
            descricao = descricoes[i].flavor_text;
            break;
        }
    }

    return descricao;
}

//atualiza os dados na tela
export async function atualizarDados(pokemon) {
    //variaveis de dados
    let data = await getDados(pokemon);
    
    //nome e imagem
    dom.nome.innerText = data.name + " #" + data.id;

    //guarda as sprites
    spritesShiny[0] = data.sprites.other["official-artwork"].front_default;
    spritesShiny[1] = data.sprites.other["official-artwork"].front_shiny;
    
    //volta o shiny para o padrão e chama a função que altera
    shiny.isShiny = false;
    alterarSprite(shiny.isShiny);

    //status
    let hp = data.stats[0].base_stat;
    let attack = data.stats[1].base_stat;
    let defense = data.stats[2].base_stat;
    let spAttack = data.stats[3].base_stat;
    let spDefense = data.stats[4].base_stat;
    let speed = data.stats[5].base_stat;

    //atualiza os status
    dom.hp.innerText = "HP " + hp;
    dom.attack.innerText = "Attack " + attack;
    dom.defense.innerText = "Defense  " + defense;
    dom.spAttack.innerText = "Sp. Attack " + spAttack;
    dom.spDefense.innerText ="Sp. Defense " +  spDefense;
    dom.speed.innerText = "Speed " + speed;
    
    //tipos
    let tipos = [null];
    // A função para cada tipo guarda em uma posição do vetor o nome do tipo
    for (let i = 0; i < data.types.length; i++) {
        tipos[i] = data.types[i].type.name;
    }
    
    if (tipos.length > 1) {
        dom.tipo1.innerText = tipos[0];
        dom.tipo2.innerText = tipos[1];
    }else{
        dom.tipo1.innerText = tipos[0];
        dom.tipo2.innerText = "Nenhum";
    }

    //pega as cores e coloca dentro da variavel
    let corPrimaria = style.corTipo[tipos[0]];
    let corSecundaria = style.corTipo[tipos[1]];

    // Muda o primeiro tipo e se existir mais um, muda tbm
    dom.blocoTipo1.style.backgroundColor = corPrimaria;
    dom.iconeTipo1.setAttribute("src", `/imagens/iconesTipos/${tipos[0]}.svg`);
    
    if (tipos.length > 1) {
        dom.blocoTipo2.style.display = "flex";
        dom.blocoTipo2.style.backgroundColor = corSecundaria;
        dom.iconeTipo2.setAttribute("src", `/imagens/iconesTipos/${tipos[1]}.svg`);
    }else{
        dom.blocoTipo2.style.display = "none";
    }

    //Descricao
    let descricao = await getDescricao(pokemon);
    dom.descricao.innerText = descricao.replace(/[\p{Cc}]/gu," ");

    // ao final de tudo, deixa as informações visiveis
    dom.container.style.display = "block"

    //altera as cores da moldura e do botao shiny
    dom.btShiny.style.backgroundColor = corPrimaria;
    dom.imagem.style.outline = `6px solid ${corPrimaria}`;

    //altera o tamanho das barras de status

    const tamanhoBarra = new style.stats(hp,attack,defense,spAttack,spDefense,speed);

    dom.barraHP.style.width = tamanhoBarra.hp + "%";
    dom.barraAttack.style.width = tamanhoBarra.attack + "%";
    dom.barraDefense.style.width = tamanhoBarra.spDefense + "%";
    dom.barraSpAttack.style.width = tamanhoBarra.spAttack + "%";
    dom.barraSpDefense.style.width = tamanhoBarra.spDefense + "%";
    dom.barraSpeed.style.width = tamanhoBarra.speed + "%";
}

//Muda os sprites
export function alterarSprite() {
    dom.sprite.setAttribute("src",
        shiny.isShiny?spritesShiny[1]:spritesShiny[0]
    );
}

//Pega o ultimo dado que contenha a linguagem en
//A função vai receber os dados como parametro
//Percorre o array da ultima posição pra primeira
//Quando acha com a linguagem que eu quero retorna apenas a descrição

export { shiny };