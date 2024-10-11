<script>
  import {
    randomNumber,
    winner,
    draw,
    currentPlayer,
    boardGameSize,
    grid,
    numRow,
    numCol,
    columnIndexTarget,
    matchStatistics,
    gameInProgress,
  } from "./stores/Stores"; // Importa lo store e la funzione
  import GameBoard from "./components/GameBoard.svelte";
  import BoardSizeSelector from "./components/BoardSizeSelector.svelte";
  import Statistics from "./components/Statistics.svelte";

  $randomNumber;
  $winner;
  $draw;
  $currentPlayer;
  $grid;
  $boardGameSize;
  $numRow;
  $numCol;
  $winner;
  $draw;
  $columnIndexTarget;
  $matchStatistics;

  let screenSize; //BP: 576px, 768px, 992px, 1200px

  $: console.log("Random Number:", $randomNumber);
  $: console.log("Grid State:", $grid);
  $: console.log("Starts:", $currentPlayer);
  $: console.log("Number of Columns:", $numCol);
  $: console.log("Number of Rows:", $numRow);
  $: console.log("Board Game Size:", $boardGameSize);
  $: console.log("Match Statistics", $matchStatistics);
</script>

{#if !$boardGameSize}
  <BoardSizeSelector />
{:else}
  <GameBoard />
  <!-- {#if $winner || $draw}
    <Statistics />
  {/if} -->
  <Statistics />
{/if}

