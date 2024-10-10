import { get, writable } from "svelte/store";

export const randomNumber = writable(null);
export const winner = writable(false);
export const draw = writable(false);
export const boardGameSize = writable("");
export const currentPlayer = writable("");
export const matchStatistics = writable({
  players: [
    {
      name: "Giallo",
      numTurns: 0,
      numDuplicates: 0,
      numStreaks: 0,
      numBlocks: 0,
    },
    {
      name: "Rosso",
      numTurns: 0,
      numDuplicates: 0,
      numStreaks: 0,
      numBlocks: 0,
    },
  ],
});
export const grid = writable([]);
export const numRow = writable(0);
export const numCol = writable(0);
export const gameInProgress = writable(false);
export const columnIndexTarget = writable(0);

const numRandomAPI =
  "https://www.random.org/integers/?num=1&min=0&col=1&base=10&format=plain&rnd=new&max=";

//Chiamata HTTP per ottenere un numero casuale coerente alla dimensione di gioco scelta
export async function getRandomNumber(boardGameSize) {
  if (boardGameSize === "5x5") {
    try {
      const response = await fetch(`${numRandomAPI}${4}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.text();
      randomNumber.set(parseInt(data));
    } catch (error) {
      console.error("Fetch error:", error);
      randomNumber.set(null);
    }
  } else {
    try {
      const response = await fetch(`${numRandomAPI}${6}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.text();
      randomNumber.set(parseInt(data));
    } catch (error) {
      console.error("Fetch error:", error);
      randomNumber.set(null);
    }
  }
}
//Cambio giocatore
export function changePlayer(player) {
  if (player === "CPU_1") {
    currentPlayer.set("CPU_2");
  } else {
    currentPlayer.set("CPU_1");
  }
}
//Dato un numero casuale se pari inizia CPU_1
export function whoStarts(num) {
  if (num % 2 == 0) {
    currentPlayer.set("CPU_1");
  } else {
    currentPlayer.set("CPU_2");
  }
}
//Resetta i dati di gioco
export function resetGame() {
  winner.set(false);
  draw.set(false);

  matchStatistics.set({
    players: [
      {
        name: "Giallo",
        numTurns: 0,
        numDuplicates: 0,
        numStreaks: 0,
        numBlocks: 0,
      },
      {
        name: "Rosso",
        numTurns: 0,
        numDuplicates: 0,
        numStreaks: 0,
        numBlocks: 0,
      },
    ],
  });
}

export function playerColor(cell) {
  if (cell === "CPU_1") {
    return {
      "background-image": 'url("/assets/Pedina_Gialla.png")',
      width: "95px",
      height: "95px",
    };
  }
  if (cell === "CPU_2") {
    return {
      "background-image": 'url("/assets/Pedina_rossa.png")',
      width: "95px",
      height: "95px",
    };
  }
  if (cell === null) {
    return {
      "background-image": 'url("/assets/Cella_vuota.png")',
      width: "95px",
      height: "95px",
    };
  }
}

//Genera il tabellone di gioco in base alla dimensione scelta
export async function generateBoardGame(size) {
  //azzera tutti i dati di gioco
  resetGame();
  //estrai un numero casuale per saper chi inizia
  await getRandomNumber(size);

  //se il numero è pari inizia CPU_1 altrimenti CPU_2
  whoStarts(get(randomNumber));

  boardGameSize.set(size);
  grid.set([]); // Svuota la griglia

  const newGrid = [];
  if (size === "5x5") {
    // Creazione della griglia 5x5
    for (let i = 0; i < 5; i++) {
      const row = Array(5).fill(null); // Crea una riga di 5 celle

      newGrid.push(row);
    }
    numRow.set(5);
    numCol.set(5);
  } else if (size === "7x6") {
    // Creazione della griglia 7x6
    for (let i = 0; i < 6; i++) {
      const row = Array(7).fill(null); // Crea una riga di 6 celle

      newGrid.push(row);
    }
    numRow.set(6);
    numCol.set(7);
  }
  //aggiorna la griglia
  grid.set(newGrid);
}

//Se la plancia è piena la partita è pareggiata
export function isDraw(grid) {
  // Verifica se la griglia è completa: se viene trovato almeno uno 0 la partita sicuramente non è terminata
  for (let riga of grid) {
    for (let cella of riga) {
      if (cella === null) {
        return false;
      }
    }
  }
  console.log("Partita pareggiata");
  return true;
}

//Posiziona la pedina in una colonna passata come parametro, rispettando la gravità del gioco
export function placePawn(player, numRow, colIndex, grid) {
  for (let indiceRiga = numRow - 1; indiceRiga >= 0; indiceRiga--) {
    if (grid[indiceRiga][colIndex] === null) {
      grid[indiceRiga][colIndex] = player;
      return true;
    }
  }
  return false;
}

//Fa partire una nuova partita
export function playAgain() {
  resetGame();
  boardGameSize.set("");
  gameInProgress.set(false);
}

//Controlla se la partita è finita o pareggiata (true). In caso contrario cambia giocatore (false)
export async function endOrChangePlayer() {
  // verifica vittoria
  verifyVictory();
  if (winner) {
    // console.log(`${currentPlayer} ha vinto!`);
    return true; // partita finita
  }

  // verifica pareggio
  if (isDraw(get(grid))) {
    console.log("Pareggio!");
    draw.set(true);
    return true; // partita finita
  }

  // cambio giocatore
  changePlayer(currentPlayer);
  return false; // continua il gioco
}

//Cerca la mossa per vincere o bloccare la vincita
export function blockOrWin() {
  const opponentPlayer = currentPlayer === "CPU_1" ? "CPU_2" : "CPU_1";
  console.log("Provo a vincere");
  //Cerca un trio orizzontale per vincere
  let target = findTrioHorizontal(
    get(numRow),
    get(numCol),
    get(grid),
    get(currentPlayer)
  );

  // Se non è stato trovato un trio orizzontale per vincere, controlla il trio diagonale
  if (!target.found)
    target = findTrioDiagonal(
      get(numRow),
      get(numCol),
      get(grid),
      get(currentPlayer)
    );

  // Se non è stato trovato un trio diagonale per vincere, controlla il trio verticale
  if (!target.found)
    target = findTrioVertical(
      get(numRow),
      get(numCol),
      get(grid),
      get(currentPlayer)
    );

  //Se il target è stato trovato assegna l'indice trovato a columnIndexTarget
  if (target.found) {
    console.log("Trovata combinazione per vincere");
    columnIndexTarget.set(target.colIndex);
    console.log(
      "Indice colonna da riempire per vincere",
      get(columnIndexTarget)
    );
    // Incrementa numStreak in base al giocatore in turno
    matchStatistics.update((stat) => {
      currentPlayer === "CPU_1"
        ? stat.players[0].numStreaks++
        : stat.players[1].numStreaks++;
      return stat; // C'è una mossa vincente
    });
    return true;
  }

  console.log("Non sono riuscito a vincere.");
  console.log("Provo a bloccare");

  //Se non è stato possibile vincere, controlla se è possibile bloccare
  //Cerca un trio orizzontale per bloccare
  target = findTrioHorizontal(
    get(numRow),
    get(numCol),
    get(grid),
    opponentPlayer
  );

  // Se non è stato trovato un trio orizzontale per bloccare, controlla il trio diagonale
  if (!target.found)
    target = findTrioDiagonal(
      get(numRow),
      get(numCol),
      get(grid),
      opponentPlayer
    );

  // Se non è stato trovato un trio diagonale per bloccare, controlla il trio verticale
  if (!target.found)
    target = findTrioVertical(
      get(numRow),
      get(numCol),
      get(grid),
      opponentPlayer
    );

  //Se il target è stato trovato assegna l'indice trovato a columnIndexTarget
  if (target.found) {
    console.log("Trovata combinazione per bloccare");
    columnIndexTarget.set(target.colIndex);
    console.log(
      "Indice colonna da riempire per bloccare",
      get(columnIndexTarget)
    );
    // Incrementa numBlocks in base al giocatore in turno
    matchStatistics.update((stat) => {
      currentPlayer === "CPU_1"
        ? stat.players[0].numBlocks++
        : stat.players[1].numBlocks++;
      return stat; // C'è una mossa da bloccare
    });
    return true;
  }
  console.log("Non sono riuscito a bloccare.");
  return false; // Nessuna mossa vincente trovata
}

// Cerca di fare un tris sensato
export function tryToMakeTrio() {
  console.log("Provo a fare un tris sensato");

  //Cerca un duo verticale per fare tris sensato
  let target = findCoupleVertical(
    get(numRow),
    get(numCol),
    get(grid),
    get(currentPlayer)
  );

  // Se non è stato trovato un duo verticale, controlla il duo orizzontale(get(numRow), get(numCol), get(grid), get(currentPlayer));
  if (!target.found)
    target = findCoupleHorizontal(
      get(numRow),
      get(numCol),
      get(grid),
      get(currentPlayer)
    );

  // Se non è stato trovato un duo orizzontale, controlla il duo diagonale
  if (!target.found)
    target = findCoupleDiagonal(
      get(numRow),
      get(numCol),
      get(grid),
      get(currentPlayer)
    );

  //Se il target è stato trovato assegna l'indice trovato a columnIndexTarget
  if (target.found) {
    console.log("Trovata combinazione per fare tris sensato");
    columnIndexTarget.set(target.colIndex);
    console.log(
      "Indice colonna da riempire per fare tris",
      get(columnIndexTarget)
    );
    // Incrementa numStreak in base al giocatore in turno
    matchStatistics.update((stat) => {
      currentPlayer === "CPU_1"
        ? stat.players[0].numStreaks++
        : stat.players[1].numStreaks++;
      return stat;
    });
    return true;
  }

  console.log("Non sono riuscito a fare tris sensato.");
  return false;
}

//Cerca di fare un duo sensato
export function tryToMakeCouple() {
  console.log("Provo a fare un duo sensato");

  //Cerca un singolo verticale per fare un duo sensato
  let target = findSingleVertical(
    get(numRow),
    get(numCol),
    get(grid),
    get(currentPlayer)
  );

  // Se non è stato trovato un singolo verticale, controlla il singolo orizzontale
  if (!target.found)
    target = findSingleHorizontal(
      get(numRow),
      get(numCol),
      get(grid),
      get(currentPlayer)
    );

  // Se non è stato trovato un singolo orizzontale, controlla il singolo diagonale
  if (!target.found)
    target = findSingleDiagonal(
      get(numRow),
      get(numCol),
      get(grid),
      get(currentPlayer)
    );

  //Se il target è stato trovato assegna l'indice trovato a columnIndexTarget
  if (target.found) {
    console.log("Trovata combinazione per fare duo sensato");
    columnIndexTarget.set(target.colIndex);
    console.log(
      "Indice colonna da riempire per fare duo",
      get(columnIndexTarget)
    );
    // Incrementa numStreaks in base al giocatore in turno
    matchStatistics.update((stat) => {
      currentPlayer === "CPU_1"
        ? stat.players[0].numStreaks++
        : stat.players[1].numStreaks++;
      return stat;
    });
    return true;
  }

  console.log("Non sono riuscito a fare duo sensato.");
  return false;
}

// Dà inizio al gioco
export async function play() {
  gameInProgress.set(true);

  let myGame = setInterval(async () => {
    console.log("*********************");
    // Incrementa il numero di turni in base al giocatore in turno

    matchStatistics.update((stat) => {
      currentPlayer === "CPU_1"
        ? stat.players[0].numTurns++
        : stat.players[1].numTurns++;
      return stat;
    });

    console.log(`E' il turno di `, get(currentPlayer));

    // Vinci o blocca se possibile
    // se trova una combinazione vincente o da bloccare per impedire la vincita inserisce la pedina nella colonna trovata e la mette in basso garantendo la gravità del gioco
    if (blockOrWin()) {
      console.log("Block or Win trovato, posiziona per vincere o bloccare");
      placePawn(currentPlayer, numRow, columnIndexTarget, grid);

      //Verifica se c'è stata una vincita/blocco o pareggio altrimenti cambia il giocatore e va avanti
      if (await endOrChangePlayer()) {
        clearInterval(myGame);
        return;
      }
    }
    //se non è stato possibile vincere o bloccare controlla se è possibile fare un tris sensato
    else if (tryToMakeTrio()) {
      console.log("Trovata combinazione per fare tris");
      placePawn(currentPlayer, numRow, columnIndexTarget, grid);

      if (await endOrChangePlayer()) {
        clearInterval(myGame);
        return;
      }
    }
    //se non è stata trovata una combinazione per fare un tris sensato controlla se è possibile fare un duo sensato
    else if (tryToMakeCouple()) {
      console.log("Trovata combinazione per fare duo");
      placePawn(currentPlayer, numRow, columnIndexTarget, grid);
      if (await endOrChangePlayer()) {
        clearInterval(myGame);
        return;
      }
    }
    //se non è stata trovata una combinazione per fare duo sensato inserisce la pedina casualmente
    else {
      await tryToPlaceRandomPawn();
      if (await endOrChangePlayer()) {
        clearInterval(myGame);
        return;
      }
    }
  }, 2000); // Ripete ogni 2 secondi
}

// ---------------------------------
// METODI DI VERIFICA VINCITA/BLOCCO E/O MOSSE SENSATE
//Verifica la vittoria
export function verifyVictory() {
  // Verifica se qualcuno dei metodi è true
  const won =
    forza4Horizontal(get(numRow), get(numCol), get(grid), get(currentPlayer)) ||
    forza4Diagonal(get(numRow), get(numCol), get(grid), get(currentPlayer)) ||
    forza4Vertical(get(numRow), get(numCol), get(grid), get(currentPlayer));

  //Se true il giocatore in turno ha vinto
  if (won) {
    winner.set(true);
    console.log("*****Hai vinto");
    return true;
  } else {
    winner.set(false);
    console.log("Non hai ancora vinto");
  }
  return false;
}
//DIAGONALI
//Verifica vincita/blocco e mosse sensate in diagonale
export function forza4Diagonal(numRow, numCol, grid, player) {
  //streak diagonale destro
  for (let indiceRiga = numRow - 1; indiceRiga >= 3; indiceRiga--) {
    for (let indiceColonna = 0; indiceColonna <= numCol - 4; indiceColonna++) {
      if (
        grid[indiceRiga][indiceColonna] === player &&
        grid[indiceRiga - 1][indiceColonna + 1] === player &&
        grid[indiceRiga - 2][indiceColonna + 2] === player &&
        grid[indiceRiga - 3][indiceColonna + 3] === player
      ) {
        console.log(`${player} ha fatto streak diagonale destro`);

        return true;
      }
    }
  }
  //streak diagonale sinistro
  for (let indiceRiga = numRow - 1; indiceRiga >= 3; indiceRiga--) {
    for (let indiceColonna = numCol - 1; indiceColonna >= 3; indiceColonna--) {
      if (
        grid[indiceRiga][indiceColonna] === player &&
        grid[indiceRiga - 1][indiceColonna - 1] === player &&
        grid[indiceRiga - 2][indiceColonna - 2] === player &&
        grid[indiceRiga - 3][indiceColonna - 3] === player
      ) {
        console.log(`${player} ha fatto diagonale sinistro`);
        return true;
      }
    }
  }

  return false;
}
export function findTrioDiagonal(numRow, numCol, grid, player) {
  //diagonale destro
  const result = {
    found: false,
    colIndex: 0,
  };
  for (let indiceRiga = numRow - 1; indiceRiga >= 3; indiceRiga--) {
    for (let indiceColonna = 0; indiceColonna <= numCol - 4; indiceColonna++) {
      let control = {
        player: 0,
        null: 0,
        index: -1,
        indexValid: false,
        combination: [],
      };
      //scansiona a 4 a 4
      for (let i = 0; i < 4; i++) {
        //se nella cella c'è player incrementa player
        if (grid[indiceRiga - i][indiceColonna + i] === player) {
          control.player++;
          control.combination.push("x");
        }
        //se nella cella c'è null incrementa null
        else if (grid[indiceRiga - i][indiceColonna + i] === null) {
          control.null++;
          control.combination.push("-");
          //se la cella sotto la cella null è piena indexValid = true e index = indiceColonna + i
          if (
            indiceRiga - i === numRow - 1 ||
            grid[indiceRiga - i + 1][indiceColonna + i] !== null
          ) {
            control.indexValid = true;
            control.index = indiceColonna + i;
          }
        }
      }
      //se control.player = 3, control.null = 1 e indexValid = true, restiruisci result colIndex = indiceColonna e found = true
      if (control.player === 3 && control.null === 1 && control.indexValid) {
        console.log("Forza4 diagonale destro sensato possibile");
        console.log(
          "Combinazione trio sensato intercettata:",
          control.combination
        );
        result.found = true;
        result.colIndex = control.index;
        return result;
      }
    }
  }
  //diagonale sinistro
  for (let indiceRiga = numRow - 1; indiceRiga >= 3; indiceRiga--) {
    for (let indiceColonna = numCol - 1; indiceColonna >= 3; indiceColonna--) {
      let control = {
        player: 0,
        null: 0,
        index: -1,
        indexValid: false,
        combination: [],
      };
      //scansiona a 4 a 4
      for (let i = 0; i < 4; i++) {
        //se nella cella c'è player incrementa player
        if (grid[indiceRiga - i][indiceColonna - i] === player) {
          control.player++;
          control.combination.push("x");
        }
        //se nella cella c'è null incrementa null
        else if (grid[indiceRiga - i][indiceColonna - i] === null) {
          control.null++;
          control.combination.push("-");
          //se la cella sotto la cella null è piena indexValid = true e index = indiceColonna + i
          if (
            indiceRiga - i === numRow - 1 ||
            grid[indiceRiga - i + 1][indiceColonna - i] !== null
          ) {
            control.indexValid = true;
            control.index = indiceColonna - i;
          }
        }
      }
      //se control.player = 3, control.null = 1 e indexValid = true, restiruisci result colIndex = indiceColonna e found = true
      if (control.player === 3 && control.null === 1 && control.indexValid) {
        console.log("Forza4 diagonale sinistro sensato possibile");
        console.log(
          "Combinazione trio sensato intercettata:",
          control.combination
        );
        result.found = true;
        result.colIndex = control.index;
        return result;
      }
    }
  }

  return result;
}
export function findCoupleDiagonal(numRow, numCol, grid, player) {
  //diagonale destro
  const result = {
    found: false,
    colIndex: 0,
  };
  for (let indiceRiga = numRow - 1; indiceRiga >= 3; indiceRiga--) {
    for (let indiceColonna = 0; indiceColonna <= numCol - 4; indiceColonna++) {
      let control = {
        player: 0,
        null: 0,
        index: -1,
        indexValid: false,
        combination: [],
      };
      //scansiona a 4 a 4
      for (let i = 0; i < 4; i++) {
        //se nella cella c'è player incrementa player
        if (grid[indiceRiga - i][indiceColonna + i] === player) {
          control.player++;
          control.combination.push("x");
        }
        //se nella cella c'è null incrementa null
        else if (grid[indiceRiga - i][indiceColonna + i] === null) {
          control.null++;
          control.combination.push("-");
          //se la cella sotto la cella null è piena indexValid = true e index = indiceColonna + i
          if (
            indiceRiga - i === numRow - 1 ||
            grid[indiceRiga - i + 1][indiceColonna + i] !== null
          ) {
            control.indexValid = true;
            control.index = indiceColonna + i;
          }
        }
      }
      //se control.player = 2, control.null = 2 e indexValid = true, restiruisci result colIndex = indiceColonna e found = true
      if (control.player === 2 && control.null === 2 && control.indexValid) {
        console.log("Trio diagonale destro sensato possibile");
        console.log(
          "Combinazione duo sensato intercettata:",
          control.combination
        );
        result.found = true;
        result.colIndex = control.index;
        return result;
      }
    }
  }
  //diagonale sinistro
  for (let indiceRiga = numRow - 1; indiceRiga >= 3; indiceRiga--) {
    for (let indiceColonna = numCol - 1; indiceColonna >= 3; indiceColonna--) {
      let control = {
        player: 0,
        null: 0,
        index: -1,
        indexValid: false,
        combination: [],
      };
      //scansiona a 4 a 4
      for (let i = 0; i < 4; i++) {
        //se nella cella c'è player incrementa player
        if (grid[indiceRiga - i][indiceColonna - i] === player) {
          control.player++;
          control.combination.push("x");
        }
        //se nella cella c'è null incrementa null
        else if (grid[indiceRiga - i][indiceColonna - i] === null) {
          control.null++;
          control.combination.push("-");
          //se la cella sotto la cella null è piena indexValid = true e index = indiceColonna + i
          if (
            indiceRiga - i === numRow - 1 ||
            grid[indiceRiga - i + 1][indiceColonna - i] !== null
          ) {
            control.indexValid = true;
            control.index = indiceColonna - i;
          }
        }
      }
      //se control.player = 2, control.null = 2 e indexValid = true, restiruisci result colIndex = indiceColonna e found = true
      if (control.player === 2 && control.null === 2 && control.indexValid) {
        console.log("Trio diagonale sinistro sensato possibile");
        console.log(
          "Combinazione duo sensato intercettata:",
          control.combination
        );
        result.found = true;
        result.colIndex = control.index;
        return result;
      }
    }
  }

  return result;
}
export function findSingleDiagonal(numRow, numCol, grid, player) {
  //diagonale destro
  const result = {
    found: false,
    colIndex: 0,
  };
  for (let indiceRiga = numRow - 1; indiceRiga >= 3; indiceRiga--) {
    for (let indiceColonna = 0; indiceColonna <= numCol - 4; indiceColonna++) {
      let control = {
        player: 0,
        null: 0,
        index: -1,
        indexValid: false,
        combination: [],
      };
      //scansiona a 4 a 4
      for (let i = 0; i < 4; i++) {
        //se nella cella c'è player incrementa player
        if (grid[indiceRiga - i][indiceColonna + i] === player) {
          control.player++;
          control.combination.push("x");
        }
        //se nella cella c'è null incrementa null
        else if (grid[indiceRiga - i][indiceColonna + i] === null) {
          control.null++;
          control.combination.push("-");
          //se la cella sotto la cella null è piena indexValid = true e index = indiceColonna + i
          if (
            indiceRiga - i === numRow - 1 ||
            grid[indiceRiga - i + 1][indiceColonna + i] !== null
          ) {
            control.indexValid = true;
            control.index = indiceColonna + i;
          }
        }
      }
      //se control.player = 1, control.null = 3 e indexValid = true, restiruisci result colIndex = indiceColonna e found = true
      if (control.player === 1 && control.null === 3 && control.indexValid) {
        console.log("Duo diagonale destro sensato possibile");
        console.log(
          "Combinazione singola sensata intercettata:",
          control.combination
        );
        result.found = true;
        result.colIndex = control.index;
        return result;
      }
    }
  }
  //diagonale sinistro
  for (let indiceRiga = numRow - 1; indiceRiga >= 3; indiceRiga--) {
    for (let indiceColonna = numCol - 1; indiceColonna >= 3; indiceColonna--) {
      let control = {
        player: 0,
        null: 0,
        index: -1,
        indexValid: false,
        combination: [],
      };
      //scansiona a 4 a 4
      for (let i = 0; i < 4; i++) {
        //se nella cella c'è player incrementa player
        if (grid[indiceRiga - i][indiceColonna - i] === player) {
          control.player++;
          control.combination.push("x");
        }
        //se nella cella c'è null incrementa null
        else if (grid[indiceRiga - i][indiceColonna - i] === null) {
          control.null++;
          control.combination.push("-");
          //se la cella sotto la cella null è piena indexValid = true e index = indiceColonna + i
          if (
            indiceRiga - i === numRow - 1 ||
            grid[indiceRiga - i + 1][indiceColonna - i] !== null
          ) {
            control.indexValid = true;
            control.index = indiceColonna - i;
          }
        }
      }
      //se control.player = 1, control.null = 3 e indexValid = true, restiruisci result colIndex = indiceColonna e found = true
      if (control.player === 1 && control.null === 3 && control.indexValid) {
        console.log("Duo diagonale sinistro sensato possibile");
        console.log(
          "Combinazione singola sensata intercettata:",
          control.combination
        );
        result.found = true;
        result.colIndex = control.index;
        return result;
      }
    }
  }

  return result;
}

//ORIZZONTALI
//Verifica vincita/blocco e mosse sensate in orizzontale
export function forza4Horizontal(numRow, numCol, grid, player) {
  for (let indiceRiga = numRow - 1; indiceRiga >= 0; indiceRiga--) {
    for (let indiceColonna = 0; indiceColonna <= numCol - 4; indiceColonna++) {
      // console.log(`Controllo orizzontale: (${indiceRiga}, ${indiceColonna})`);
      if (
        grid[indiceRiga][indiceColonna] === player &&
        grid[indiceRiga][indiceColonna + 1] === player &&
        grid[indiceRiga][indiceColonna + 2] === player &&
        grid[indiceRiga][indiceColonna + 3] === player
      ) {
        console.log(`${player} ha fatto streak orizzontale`);
        // this.winner = true;
        // this.typeOfStreak = 'diagonale destro';
        return true;
      }
    }
  }
  return false;
}

export function findTrioHorizontal(numRow, numCol, grid, player) {
  const result = {
    found: false,
    colIndex: 0,
  };
  for (let indiceRiga = numRow - 1; indiceRiga >= 0; indiceRiga--) {
    for (let indiceColonna = 0; indiceColonna <= numCol - 4; indiceColonna++) {
      let control = {
        player: 0,
        null: 0,
        index: -1,
        indexValid: false,
        combination: [],
      };
      //scansiona a 4 a 4
      for (let i = 0; i < 4; i++) {
        //se nella cella c'è player incrementa player
        if (grid[indiceRiga][indiceColonna + i] === player) {
          control.player++;
          control.combination.push("x");
        }
        //se nella cella c'è null incrementa null
        else if (grid[indiceRiga][indiceColonna + i] === null) {
          control.null++;
          control.combination.push("-");
          //se la cella sotto la cella null è piena indexValid = true e index = indiceColonna + i
          if (
            indiceRiga === numRow - 1 ||
            grid[indiceRiga + 1][indiceColonna + i] !== null
          ) {
            control.indexValid = true;
            control.index = indiceColonna + i;
          }
        }
      }
      //se control.player = 3, control.null = 1 e indexValid = true, restiruisci result colIndex = indiceColonna e found = true
      if (control.player === 3 && control.null === 1 && control.indexValid) {
        console.log("Forza4 orizzontale sensato possibile");
        console.log(
          "Combinazione tris sensata intercettata:",
          control.combination
        );
        result.found = true;
        result.colIndex = control.index;
        return result;
      }
    }
  }
  return result;
}
export function findCoupleHorizontal(numRow, numCol, grid, player) {
  const result = {
    found: false,
    colIndex: 0,
  };
  for (let indiceRiga = numRow - 1; indiceRiga >= 0; indiceRiga--) {
    for (let indiceColonna = 0; indiceColonna <= numCol - 4; indiceColonna++) {
      let control = {
        player: 0,
        null: 0,
        index: -1,
        indexValid: false,
        combination: [],
      };
      //scansiona a 4 a 4
      for (let i = 0; i < 4; i++) {
        //se nella cella c'è player incrementa player
        if (grid[indiceRiga][indiceColonna + i] === player) {
          control.player++;
          control.combination.push("x");
        }
        //se nella cella c'è null incrementa null
        else if (grid[indiceRiga][indiceColonna + i] === null) {
          control.null++;
          control.combination.push("-");
          //se la cella sotto la cella null è piena indexValid = true e index = indiceColonna + i
          if (
            indiceRiga === numRow - 1 ||
            grid[indiceRiga + 1][indiceColonna + i] !== null
          ) {
            control.indexValid = true;
            control.index = indiceColonna + i;
          }
        }
      }
      //se control.player = 2, control.null = 2 e indexValid = true, restiruisci result colIndex = indiceColonna e found = true
      if (control.player === 2 && control.null === 2 && control.indexValid) {
        console.log("Tris orizzontale sensato possibile");
        console.log(
          "Combinazione duo sensato intercettata:",
          control.combination
        );
        result.found = true;
        result.colIndex = control.index;
        return result;
      }
    }
  }
  return result;
}
export function findSingleHorizontal(numRow, numCol, grid, player) {
  const result = {
    found: false,
    colIndex: 0,
  };
  for (let indiceRiga = numRow - 1; indiceRiga >= 0; indiceRiga--) {
    for (let indiceColonna = 0; indiceColonna <= numCol - 4; indiceColonna++) {
      let control = {
        player: 0,
        null: 0,
        index: -1,
        indexValid: false,
        combination: [],
      };
      //scansiona a 4 a 4
      for (let i = 0; i < 4; i++) {
        //se nella cella c'è player incrementa player
        if (grid[indiceRiga][indiceColonna + i] === player) {
          control.player++;
          control.combination.push("x");
        }
        //se nella cella c'è null incrementa null
        else if (grid[indiceRiga][indiceColonna + i] === null) {
          control.null++;
          control.combination.push("-");
          //se la cella sotto la cella null è piena indexValid = true e index = indiceColonna + i
          if (
            indiceRiga === numRow - 1 ||
            grid[indiceRiga + 1][indiceColonna + i] !== null
          ) {
            control.indexValid = true;
            control.index = indiceColonna + i;
          }
        }
      }
      //se control.player = 1, control.null = 3 e indexValid = true, restiruisci result colIndex = indiceColonna e found = true
      if (control.player === 1 && control.null === 3 && control.indexValid) {
        console.log("Duo orizzontale sensato possibile");
        console.log(
          "Combinazione singola sensata intercettata:",
          control.combination
        );
        result.found = true;
        result.colIndex = control.index;
        return result;
      }
    }
  }
  return result;
}

//VERTICALI
//Verifica vincita/blocco e mosse sensate in verticale
export function forza4Vertical(numRow, numCol, grid, player) {
  //streak verticale
  for (let indiceRiga = numRow - 1; indiceRiga >= 3; indiceRiga--) {
    for (let indiceColonna = 0; indiceColonna < numCol; indiceColonna++) {
      // console.log(`Controllo verticale: (${indiceRiga}, ${indiceColonna})`);
      if (
        grid[indiceRiga][indiceColonna] === player &&
        grid[indiceRiga - 1][indiceColonna] === player &&
        grid[indiceRiga - 2][indiceColonna] === player &&
        grid[indiceRiga - 3][indiceColonna] === player
      ) {
        console.log(`${player} ha fatto streak verticale`);
        // this.winner = true;
        // this.typeOfStreak = 'verticale';
        return true;
      }
    }
  }
  return false;
}
export function findTrioVertical(numRow, numCol, grid, player) {
  const result = {
    found: false,
    colIndex: 0,
  };
  //streak verticale
  for (let indiceRiga = numRow - 1; indiceRiga >= 3; indiceRiga--) {
    for (let indiceColonna = 0; indiceColonna < numCol; indiceColonna++) {
      //Controllo combinazione XXXnull
      if (
        grid[indiceRiga][indiceColonna] === player &&
        grid[indiceRiga - 1][indiceColonna] === player &&
        grid[indiceRiga - 2][indiceColonna] === player &&
        grid[indiceRiga - 3][indiceColonna] === null
      ) {
        console.log("Forza4 verticale sensato possibile");
        console.log("Combinazione trio sensata intercettata: xxx-");
        result.found = true;
        result.colIndex = indiceColonna;
        return result;
      }
    }
  }
  return result;
}
export function findCoupleVertical(numRow, numCol, grid, player) {
  const result = {
    found: false,
    colIndex: 0,
  };
  //duo verticale
  for (let indiceRiga = numRow - 1; indiceRiga >= 3; indiceRiga--) {
    for (let indiceColonna = 0; indiceColonna < numCol; indiceColonna++) {
      //Controllo combinazione XXnullnull
      if (
        grid[indiceRiga][indiceColonna] === player &&
        grid[indiceRiga - 1][indiceColonna] === player &&
        grid[indiceRiga - 2][indiceColonna] === null &&
        grid[indiceRiga - 3][indiceColonna] === null
      ) {
        console.log("Trio verticale sensato possibile");
        console.log("Combinazione doppio sensata intercettata: xx--");
        result.found = true;
        result.colIndex = indiceColonna;
        return result;
      }
    }
  }
  return result;
}
export function findSingleVertical(numRow, numCol, grid, player) {
  const result = {
    found: false,
    colIndex: 0,
  };
  //duo verticale
  for (let indiceRiga = numRow - 1; indiceRiga >= 3; indiceRiga--) {
    for (let indiceColonna = 0; indiceColonna < numCol; indiceColonna++) {
      //Controllo combinazione Xnullnullnull
      if (
        grid[indiceRiga][indiceColonna] === player &&
        grid[indiceRiga - 1][indiceColonna] === null &&
        grid[indiceRiga - 2][indiceColonna] === null &&
        grid[indiceRiga - 3][indiceColonna] === null
      ) {
        console.log("Duo verticale sensato possibile");
        console.log("Combinazione singolo sensato intercettata: x---");
        result.found = true;
        result.colIndex = indiceColonna;
        return result;
      }
    }
  }
  return result;
}

// Metodo per provare a inserire la pedina in una colonna casuale
export async function tryToPlaceRandomPawn() {
  let placed = false;
  console.log("Inserisco la pedina casualmente");
  // Finché la pedina non viene piazzata su una colonna libera viene chiamato il metodo tryToPlace()
  const tryToPlace = () => {
    // Estrai un numero casuale per la colonna
    return new Promise((resolve) => {
      const colIndexRandom = null;
      getRandomNumber(get(boardGameSize)).then(() => {
        colIndexRandom = get(randomNumber);
      });
      console.log(
        "Prova ad inserire nella colonna con indice",
        get(colIndexRandom)
      );

      // Prova a piazzare la pedina, se riesce `placePawnRandomly` restituirà `true`
      placed = placePawn(
        get(currentPlayer),
        get(numRow),
        colIndexRandom,
        get(grid)
      );

      // Se non riesce incrementa numDuplicates in base al giocatore in turno e richiama il metodo tryToPlace()
      if (!placed) {
        console.log("Colonna piena");
        // Incrementa numDuplicates in base al giocatore in turno
        matchStatistics.update((stat) => {
          currentPlayer === "CPU_1"
            ? stat.players[0].numDuplicates++
            : stat.players[1].numDuplicates++;
          return stat; 
        });
        resolve(tryToPlace());
      } else {
        console.log(
          `Pedina inserita nella colonna con indice ${colIndexRandom} `
        );
        resolve();
      }
    });
  };
  // Inizia il ciclo
  await tryToPlace();
}


