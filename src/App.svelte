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
    matchStatistics,
    showHome
  
  } from "./stores/Stores"; // Importa lo store (funzioni e writable)
  import GameBoard from "./components/GameBoard.svelte";
  import BoardSizeSelector from "./components/BoardSizeSelector.svelte";
  import Statistics from "./components/Statistics.svelte";
  import Header from "./components/Header.svelte";
  import Home from "./components/Home.svelte";

  $: console.log("Random Number:", $randomNumber);
  $: console.log("Grid State:", $grid);
  $: console.log("Starts:", $currentPlayer);
  $: console.log("Number of Columns:", $numCol);
  $: console.log("Number of Rows:", $numRow);
  $: console.log("Board Game Size:", $boardGameSize);
  $: console.log("Board Game Row:", $boardGameSize.height);
  $: console.log("Board Game Col:", $boardGameSize.width);
  $: console.log("Match Statistics", $matchStatistics);
  $: console.log("Board Game Valid?", $boardGameSize.valid);

</script>

{#if $showHome}
  <Home />
{:else if !$boardGameSize.valid}
  <Header />
  <BoardSizeSelector />
{:else}
  <Header />
  <GameBoard />
  {#if $winner || $draw}
    <Statistics />
  {/if}
{/if}
