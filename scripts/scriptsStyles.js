export const corTipo = {
    normal: "#9099A1",
    fire: "#FF9C54",
    water: "#4D90D5",
    electric: "#F3D23B",
    grass: "#63BB5B",
    ice: "#74CEC0",
    fighting: "#CE4069",
    poison: "#AB6AC8",
    ground: "#D97746",
    flying: "#92AADE",
    psychic: "#F97176",
    bug: "#90C12C",
    rock: "#C7B78B",
    ghost: "#5269AC",
    dragon: "#096DC4",
    dark: "#5A5366",
    steel: "#5A8EA1",
    fairy: "#EC8FE6"
};

//CLASSE QUE AO CRIAR O OBJETO, PASSAR O VALOR BASE DO POKEMON
//A PROPRIA CLASSE QUAND98O CRIADA VAI CALCULAR O VALOR DEIXAR GUARDADA NAS CHAVES

export class stats {
    static minMax = [[1,255],
    [5,190],
    [5,230],
    [10,194],
    [20,230],
    [5,180]];

    constructor(hp, attack, defense, spAttack, spDefense, speed) {
        this.hp = this.calcTamanho(0,hp);
        this.attack = this.calcTamanho(0,attack);
        this.defense = this.calcTamanho(0,defense);
        this.spAttack = this.calcTamanho(0,spAttack);
        this.spDefense = this.calcTamanho(0,spDefense);
        this.speed = this.calcTamanho(0,speed);
    }

    calcTamanho(stat,valor) {
        let valorInicial = stats.minMax[stat][0];
        let valorFinal = stats.minMax[stat][1];

        let porcentagem = ((valor - valorInicial) / (valorFinal - valorInicial)) * 100;
        
        return porcentagem.toFixed(2);
    }
}