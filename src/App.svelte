<script>
  import { onMount } from "svelte";
  import { randomNumber, getRandomNumber } from "./stores/Stores"; // Importa lo store e la funzione

  $randomNumber;
  let currentPlayer = "";
  let grid = [];
  let boardGameSize = "";
  let numRow = 0;
  let numCol = 0;
  let winner = false;
  let columnIndexTarget = 0;
  let draw = false;
  let gameInProgress = false;
  let screenSize; //BP: 576px, 768px, 992px, 1200px
  let matchStatistics = {
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
  };
  $: console.log($randomNumber);
  //Genera il tabellone di gioco in base alla dimensione scelta
  async function generateBoardGame(size) {
    //azzera tutti i dati di gioco
    resetGame();
    //estrai un numero casuale per saper chi inizia
    await getRandomNumber(size);
    console.log("Num Random", $randomNumber); //numero casuale estratto
    //se il numero è pari inizia CPU_1 altrimenti CPU_2
    whoStarts($randomNumber);
    console.log("Inizia", currentPlayer);

    boardGameSize = size;
    grid = []; // Svuota la griglia

    if (size === "5x5") {
      // Creazione della griglia 5x5
      for (let i = 0; i < 5; i++) {
        const row = Array(5).fill(null); // Crea una riga di 5 celle
        grid.push(row);
      }
      numRow = 5;
      numCol = 5;
    } else if (size === "7x6") {
      // Creazione della griglia 7x6
      for (let i = 0; i < 6; i++) {
        const row = Array(7).fill(null); // Crea una riga di 6 celle
        grid.push(row);
      }
      numRow = 6;
      numCol = 7;
    }

    console.log("Righe e colonne", numRow, numCol);
	console.log("Grid", grid)
  }

  //Resetta i dati di gioco
  function resetGame() {
    winner = false;
    draw = false;
    matchStatistics = {
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
    };
  }

  //Dato un numero casuale se pari inizia CPU_1
  function whoStarts(num) {
    if (num % 2 == 0) {
      currentPlayer = "CPU_1";
    } else {
      currentPlayer = "CPU_2";
    }
  }


  function playerColor(cell) {
  if (cell === 'CPU_2') {
    return {
      'background-image': 'url("/img/Pedina_rossa.png")',
      width: '95px',
      height: '95px',
    };
  }
  if (cell === null) {
    return {
      'background-image': 'url("/img/Cella_vuota.png")',
      width: '95px',
      height: '95px',
    };
  }
}


</script>

{#if !boardGameSize}
  <div class="row mb-3">
    <div class="col">
      <h4 class="text-center">Scegli il formato di gioco</h4>
    </div>
  </div>

  <div class="row">
    <div class="col d-flex-column d-md-flex">
      <button
        class="btn btn-outline-primary me-5 d-block w-100 mb-3 mb-md-0 p-3 fs-3"
        on:click={() => generateBoardGame("5x5")}
      >
        5 x 5
      </button>

      <button
        class="btn btn-outline-primary d-block w-100 p-3 fs-3"
        on:click={() => generateBoardGame("7x6")}
      >
        7 x 6
      </button>
    </div>
  </div>
{:else}
  <div
    class="row d-flex flex-column flex-sm-row flex-lg-row justify-content-center align-items-center"
  >
    <!-- Tabellone -->
    <div class="col-12 col-lg-9">
      <table class="boardGame mx-auto">
        {#each grid as row}
          <tr>
            {#each row as cell}
              <td class="cell" style={playerColor(cell)}></td>
            {/each}
          </tr>
        {/each}
      </table>
    </div>
  </div>
{/if}
