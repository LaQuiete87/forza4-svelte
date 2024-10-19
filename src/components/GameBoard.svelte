<script>
  import {
    grid,
    playerColor,
    gameInProgress,
    winner,
    draw,
    play,
    playAgain,
    resetBoardGameSize,
    boardGameSize,
  } from "../stores/Stores";
</script>

<div class="container p-4">
  <div class="row d-flex flex-column justify-content-center align-items-center">
    <div class="col">
      <table class="boardGame mx-auto">
        {#each $grid as row}
          <tr>
            {#each row as cell}
              <td
              class:td-8="{$boardGameSize.width >7 ||$boardGameSize.height>9}"
               class:td-10="{$boardGameSize.width >9}"
               class="td" >
                <div
                class:cell-8="{$boardGameSize.width >7 ||$boardGameSize.height>9 }"
                 class:cell-10="{$boardGameSize.width >9}" class="cell {playerColor(cell)}"></div>
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
            on:click={resetBoardGameSize}>Indietro</button
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
            on:click={resetBoardGameSize}>Indietro</button
          >
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .boardGame {
    margin: 0;
  }
  .td {
    width: 6vw;
    height: 6vw;
    text-align: center;
    vertical-align: middle;
    border: none;
  }

  .cell {
    width: 5vw;
    height: 5vw;
    padding: 0;

    border: solid #7d2e2e 3px;
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
    .td {
      width: 12vw;
      height: 12vw;
    }
    .td-8{
      width: 9vw;
      height: 9vw;
    }
    .td-10{
      width: 7vw;
      height: 7vw;
    }
    .cell {
      width: 10vw;
      height: 10vw;
    }
    .cell-8{
      width: 8vw;
      height: 8vw;
    }
    .cell-10{
      width: 6vw;
      height: 6vw;
    }
  }
</style>
