<script>
  import { draw, currentPlayer } from "../stores/Stores";
  export let player;
</script>

<div class="container">
  <div class="row">
    <!-- cornice vittoria-sconfitta -->
    <div
      class="col rounded-3 m-3 p-4 montserrat-medium"
      class:winner={player.name === $currentPlayer}
      class:loser={player.name !== $currentPlayer && !$draw}
      class:draw={$draw}
    >
      <!-- Pedina giocatore -->
      <div class="row">
        <div class="col">
          <div
            id="player"
            class="text-center mb-3 mx-auto"
            class:yellow={player.name === "CPU_1"}
            class:red={player.name === "CPU_2"}
          ></div>
        </div>
      </div>
      <!-- Statistiche -->
      <div class="row row-cols-4 row-cols-sm-2 g-4">
        <div class="col item d-flex flex-column align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
            ><path
              d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
              fill="#6f6f6f"
            ></path></svg
          >
          <span class="quantity"> {player.numBlocks} </span>
          <span class="text"> Blocchi </span>
        </div>
        <div class="col item d-flex flex-column align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
            ><path
              d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"
              fill="#6f6f6f"
            /></svg
          >

          <span class="quantity"> {player.numTurns} </span>
          <span class="text"> Turni </span>
        </div>
        <div class="col item d-flex flex-column align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
            ><path
              d="M288 448L64 448l0-224 64 0 0-64-64 0c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l224 0c35.3 0 64-28.7 64-64l0-64-64 0 0 64zm-64-96l224 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L224 0c-35.3 0-64 28.7-64 64l0 224c0 35.3 28.7 64 64 64z"
              fill="#6f6f6f"
            /></svg
          >

          <span class="quantity"> {player.numDuplicates} </span>
          <span class="text"> Duplicati </span>
        </div>
        <div class="col item d-flex flex-column align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
            ><path
              d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"
              fill="#6f6f6f"
            />
          </svg>

          <span class="quantity"> {player.numStreaks} </span>
          <span class="text"> Streak </span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .winner {
    border: solid 5px rgb(189, 255, 193);
  }
  .loser {
    border: solid 5px rgb(255 120 120);
  }

  .draw {
    border: solid 5px rgb(255, 235, 120);
  }

  .item {
    padding: 0.9vh;
  }

  .item svg {
    width: 2vw;
    margin-bottom: 7px;
  }

  .quantity {
    font-size: 25px;
    font-weight: 600;
    color: black;
  }

  .text {
    font-size: 12px;
    font-family: inherit;
    font-weight: 600;
    color: #6f6f6f;
  }

  .yellow {
    background-color: #faf37e;
  }

  .red {
    background-color: #ff9494;
  }
  #player {
    width: 3vw;
    height: 3vw;
    border-radius: 50%;
  }
  @media only screen and (max-width: 576px) {
    .item svg {
      width: 6vw;
      margin-bottom: 7px;
    }
    .red,
    .yellow {
      font-size: 4vw;
    }
    #player {
      width: 6vw;
      height: 6vw;
    }
  }
</style>
