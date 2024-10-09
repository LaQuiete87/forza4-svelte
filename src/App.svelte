<script>
  import { onMount } from "svelte";
  import {
    randomNumber,
    getRandomNumber,
    whoStarts,
    resetGame,
    playerColor,
    winner,
    draw,
    currentPlayer,
    boardGameSize,
    grid,
    numRow,
    numCol,
    matchStatistics,
  } from "./stores/Stores"; // Importa lo store e la funzione
  import GameBoard from "./components/GameBoard.svelte";
  import BoardSizeSelector from "./components/BoardSizeSelector.svelte";

  $randomNumber;
  $winner;
  $draw;
  $currentPlayer;
  $grid;
  $boardGameSize;
  $numRow;
  $numCol;
  $matchStatistics;
  let columnIndexTarget = 0;
  let gameInProgress = false;
  let screenSize; //BP: 576px, 768px, 992px, 1200px

$:console.log("Random Number:", $randomNumber);
$:console.log("Grid State:", $grid);
$:console.log("Starts:", $currentPlayer);
$:console.log("Number of Columns:", $numCol);
$:console.log("Number of Rows:", $numRow);
$:console.log("Board Game Size:", $boardGameSize);


  
</script>

{#if !$boardGameSize}
  <BoardSizeSelector />
{:else}
  <GameBoard />
{/if}

  