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
</script>

<style>
  .boardGame {
    margin: 0;
  }
  td {
    width: 8vw;
    height: 8vw;
    text-align: center;
    vertical-align: middle;
    border: none;
  }

  .cell {
    width: 6vw;
    height: 6vw;
    padding: 0;

    border: solid rgb(125 46 46) 3px;
    border-radius: 50%;
    margin: 0 auto;
  }

  .red-pawn {
    background-color: rgb(255 120 120);
  }
  .yellow-pawn {
    background-color: rgb(255, 235, 120);
  }

  @media only screen and (max-width: 576px) {
  td {
    width: 12vw;
    height: 12vw;
  }
  .cell{
    width: 10vw;
    height: 10vw;
  }
}
</style>

<div class="container p-4">
  <div
    class="row d-flex flex-column flex-sm-row flex-lg-row justify-content-center align-items-center"
  >
    <div class="col">
      <table class="boardGame mx-auto">
        {#each $grid as row}
          <tr>
            {#each row as cell}
              <td>
                <div class="cell {playerColor(cell)}"></div>
              </td>
            {/each}
          </tr>
        {/each}
      </table>
    </div>
    {#if !$winner && !$draw}
      <div class="row mt-4 w-75">
        <div class="col d-sm-flex justify-content-center">
          <button
            disabled={$gameInProgress}
            class="btn btn-outline-success w-100 me-5 p-3 fw-semibold fs-4"
            on:click={play}
          >
            Gioca
          </button>
          <button
            disabled={$gameInProgress}
            class="btn btn-outline-danger w-100 mt-3 mt-sm-0 p-3 fw-semibold fs-4"
            on:click={() => {
              boardGameSize.set("");
            }}>Indietro</button
          >
        </div>
      </div>
    {:else if $winner || $draw}
      <div class="row mt-4 w-75">
        <div class="col d-sm-flex justify-content-center">
          <button
            class="btn btn-outline-success w-100 me-5 p-3 fw-semibold fs-4"
            on:click={playAgain}
          >
            Gioca Ancora
          </button>
          <button
            class="btn btn-outline-danger w-100 mt-3 mt-sm-0 p-3 fw-semibold fs-4"
            on:click={() => {
              boardGameSize.set("");
            }}>Indietro</button
          >
        </div>
      </div>
    {/if}
  </div>
</div>


