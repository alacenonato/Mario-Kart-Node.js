const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}


async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = "Reta"
            break;
        case random < 0.66:
            result = "Curva"
            break;
        default:
            result = "Confronto";
    }
    return result;
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        // sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);
    }
    
    // rodar dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    // testar de habilidade
    let TotalTestSkill1 = 0;
    let TotalTestSkill2 = 0;
    
    if (block ===    "Reta") {
        TotalTestSkill1 = character1.VELOCIDADE + diceResult1;
        TotalTestSkill2 = character2.VELOCIDADE + diceResult2;
    }
    if (block ===    "Curva") {
        TotalTestSkill1 = character1.MANOBRABILIDADE + diceResult1;
        TotalTestSkill2 = character2.MANOBRABILIDADE + diceResult2;
    }
    if (block ===    "Confronto") {
        TotalTestSkill1 = character1.PODER + diceResult1;
        TotalTestSkill2 = character2.PODER + diceResult2;
    }

}


(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando!...\n`);

    await playRaceEngine(player1, player2);
})();
