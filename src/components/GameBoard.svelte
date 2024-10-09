<script>
  import {
    grid,
    playerColor,
    gameInProgress,
    winner,
    draw,
    play,
    playAgain,
  } from "../stores/Stores";
  $grid;
  $gameInProgress;
  $winner;
  $draw;

  gameInProgress.subscribe(data =>{
    console.log(data)
  })
</script>

<div
  class="row d-flex flex-column flex-sm-row flex-lg-row justify-content-center align-items-center"
>
  <div class="col-12 col-lg-9">
    <table class="boardGame mx-auto">
      {#each $grid as row}
        <tr>
          {#each row as cell}
            <td class="cell" style={playerColor(cell)}></td>
          {/each}
        </tr>
      {/each}
    </table>
  </div>
  {#if !$winner && !$draw}
    <button
      disabled={$gameInProgress}
      class="btn btn-outline-success d-block w-50 mt-3 p-3 fs-3 mx-auto"
      on:click={play}
    >
      Gioca
    </button>
  {:else if $winner || $draw}
    <button
      class="btn btn-outline-success d-block w-50 mt-3 p-3 fs-3 mx-auto"
      on:click={playAgain}
    >
      Gioca Ancora
    </button>
  {/if}
</div>

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
    border: 1px solid red;
  }
</style>
