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


async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult}`);

}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        // sortear bloco
        var block = await getRandomBlock();
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

        await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
        await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);

    }
    if (block ===    "Curva") {
        TotalTestSkill1 = character1.MANOBRABILIDADE + diceResult1;
        TotalTestSkill2 = character2.MANOBRABILIDADE + diceResult2;

        await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
        await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
    }
    if (block ===    "Confronto") {
        let powerResult1 = character1.PODER + diceResult1;
        let powerResult2 = character2.PODER + diceResult2;
    }

}


(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando!...\n`);

    await playRaceEngine(player1, player2);
})();
