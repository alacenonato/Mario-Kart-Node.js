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
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);

}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        // sortear bloco
        var block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        // rodar dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // testar de habilidade
        let TotalTestSkill1 = 0;
        let TotalTestSkill2 = 0;

        if (block === "Reta") {
            TotalTestSkill1 = character1.VELOCIDADE + diceResult1;
            TotalTestSkill2 = character2.VELOCIDADE + diceResult2;

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);

        }
        if (block === "Curva") {
            TotalTestSkill1 = character1.MANOBRABILIDADE + diceResult1;
            TotalTestSkill2 = character2.MANOBRABILIDADE + diceResult2;

            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
        }
        if (block === "Confronto") {
            let powerResult1 = character1.PODER + diceResult1;
            let powerResult2 = character2.PODER + diceResult2;

            console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🚨🚨🚨`)
            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto! 🐢`);
                character2.PONTOS--;
            }

            if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto! 🐢`);

                character1.PONTOS--;

            }

            // Usando o if ternário
            // character2.pontos -= powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1 : 0;

            // character1.pontos -= powerResult2 > powerResult1 && character1.PONTOS > 0 ? 1 : 0;

            console.log(powerResult2 === powerResult1
                ? "Confronto empatado! Nenhum ponto foi perdido!" :
                "");


            // Usando o if normal
            // if (powerResult1 > powerResult2) {
            //     if (character2.PONTOS >= 0) {
            //         character2.PONTOS--;
            //     }
            // }

            // if (powerResult2 > powerResult1) {
            //     if (character1.PONTOS >= 0) {
            //         character1.PONTOS--;
            //     }
            // }

            // if (powerResult1 === powerResult2) {
            //     console.log("Confronto empatado! Nenhum ponto foi perdido!");
            //     }
            // }


        }

        // vericando o vencedor

        if (TotalTestSkill1 > TotalTestSkill2) {
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        }
        else if (TotalTestSkill2 > TotalTestSkill1) {
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        }
        console.log('---------------------------------------------------------')

    }


}


async function declareWinner(character1, character2) {
    console.log("Resultado Final: ")
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`\n${character1.NOME} ganhou a corrida! 🏆`);
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`\n${character2.NOME} ganhou a corrida! 🏆🏆`);
    } else {
        console.log(`\nEmpate! Não há vencedor! `);
    }
}

(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando!...\n`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();

