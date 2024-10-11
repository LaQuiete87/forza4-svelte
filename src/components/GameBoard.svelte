<script>
  import {
    grid,
    playerColor,
    gameInProgress,
    winner,
    draw,
    play,
    playAgain,
    boardGameSize,
  } from "../stores/Stores";
  $grid;
  $gameInProgress;
  $winner;
  $draw;


  
</script>

<style>
  .boardGame {
    margin: 0;
  }
  td {
    width: 130px;
    height: 130px;
    text-align: center;
    vertical-align: middle;
  }

  .cell {
    background-repeat: no-repeat;
    background-size: contain;
    padding: 0;
    /* border: 1px solid red; */
  }
  .empty-pawn{
    background-image: url("/assets/Cella_vuota.png");
  }
  .red-pawn{
    background-image: url("/assets/Pedina_rossa.png");
  }
  .yellow-pawn{
    background-image: url("/assets/Pedina_Gialla.png");
  }
</style>



<div
  class="row d-flex flex-column flex-sm-row flex-lg-row justify-content-center align-items-center"
>
  <div class="col-12 col-lg-9">
    <table class="boardGame mx-auto">
      {#each $grid as row}
        <tr>
          {#each row as cell}
            <td class="cell {playerColor(cell)}"  ></td>
          {/each}
        </tr>
      {/each}
    </table>
  </div>
  {#if !$winner && !$draw}
   <div class="row mt-4 w-50">
    <div class="col d-flex justify-content-center ">
      <button
      
      class="btn btn-outline-success w-100 me-5"
      on:click={play}
    >
      Gioca
    </button>
    <button class="btn btn-outline-danger w-100" on:click={()=>{
      boardGameSize.set('')
    }}>Indietro</button>
    </div>
   </div>
   
  {:else if $winner || $draw}
    <button
      class="btn btn-outline-success d-block w-50 mt-3 p-3 fs-3 mx-auto"
      on:click={playAgain}
    >
      Gioca Ancora
    </button>
  {/if}
</div>

<!-- disabled={$gameInProgress} -->