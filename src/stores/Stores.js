import { writable } from "svelte/store";

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

const numRandomAPI =
  "https://www.random.org/integers/?num=1&min=0&col=1&base=10&format=plain&rnd=new&max=";

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
  if (cell === "CPU_2") {
    return {
      "background-image": 'url("/img/Pedina_rossa.png")',
      width: "95px",
      height: "95px",
    };
  }
  if (cell === null) {
    return {
      "background-image": 'url("/img/Cella_vuota.png")',
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
  whoStarts(randomNumber);

  boardGameSize.set(size);
  grid.set([]); // Svuota la griglia

  const newGrid=[]
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
  grid.set(newGrid)
}
