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
    blockOrWin,
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

<slot>
  <style>
    #title {
      font-size: 10vw;
      font-weight: lighter;
      letter-spacing: 3vw;
  
      
      
    }
 #logo{
  min-width:65px;
  max-width:6vw;
  margin: 0 auto;
 
 }
 img{
  max-width:100%;
  display:block;
  margin:0 auto;

  
 }
 .no-space{
  letter-spacing: 0;
 }
  </style>

  <div class="container my-5">
    <div class="row">
      <div class="col">
        <h1 id="title" class="text-center">FORZA <span class="no-space">4</span></h1>
      </div>
    </div>
    <div id="logo" class="row">
      <div  class="col">
        <img src="/assets/logo.png" alt="">
      </div>
    </div>
   
      
    
   
  </div>
</slot>
{#if !$boardGameSize}
  <BoardSizeSelector></BoardSizeSelector>
{:else}
  <GameBoard />
  {#if $winner || $draw}
    <Statistics />
  {/if}
{/if}
