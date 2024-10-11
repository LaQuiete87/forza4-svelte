<script>
  import { draw, currentPlayer } from "../stores/Stores";
  export let player;

  $draw;
  $currentPlayer;
</script>
<style>
  .winner {
    border: solid 5px rgb(159 255 166);
  }
  .loser {
    border: solid 5px rgb(255 120 120);
  }

  .draw {
    border: solid 5px rgb(255, 235, 120);
  }

  .card-stat {
    height: 254px;
    color: white;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 13px;
    overflow: visible;
  }

  .card-stat .item {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .item svg {
    width: 40px;
    height: 40px;
    margin-bottom: 7px;
  }

  .item--1 {
    background: #c7c7ff;
  }

  .item--2 {
    background: #ffd8be;
  }

  .item--3 {
    background: #a9ecbf;
  }

  .item--4 {
    background: #f3bbe1;
  }

  .quantity {
    font-size: 25px;
    font-weight: 600;
  }

  .text {
    font-size: 12px;
    font-family: inherit;
    font-weight: 600;
  }

  .text--1 {
    color: rgba(149, 149, 255, 1);
  }

  .text--2 {
    color: rgba(252, 161, 71, 1);
  }

  .text--3 {
    color: rgba(66, 193, 110, 1);
  }

  .text--4 {
    color: rgba(220, 91, 183, 1);
  }

  .yellow {
    background-color: #faf37e;
    color: #ffffff;
    font-size: 28px;
    font-weight: bold;
    letter-spacing: 4px;
  }
  .red {
    background-color: #ff9494;
    color: #ffffff;
    font-size: 28px;
    font-weight: bold;
    letter-spacing: 4px;
  }
</style>
<div
  class="card m-3 p-4 montserrat-medium"
  class:winner={player.name === $currentPlayer}
  class:loser={player.name !== $currentPlayer && !$draw}
  class:draw={$draw}
>
  <div
    class=" text-center rounded-3 mb-3 p-3"
    class:yellow={player.name === "CPU_1"}
    class:red={player.name === "CPU_2"}
  >
    {player.name === "CPU_1" ? "Giallo" : "Rosso"}
  </div>
  <div class="card-stat">
    <div class="item item--1">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
        ><path
          d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
          fill="rgba(149,149,255,1)"
        ></path></svg
      >
      <span class="quantity"> {player.numBlocks} </span>
      <span class="text text--1"> Blocchi </span>
    </div>
    <div class="item item--2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
        ><path
          d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"
          fill="rgba(252,161,71,1)"
        /></svg
      >

      <span class="quantity"> {player.numTurns} </span>
      <span class="text text--2"> Turni </span>
    </div>
    <div class="item item--3">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
        ><path
          d="M288 448L64 448l0-224 64 0 0-64-64 0c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l224 0c35.3 0 64-28.7 64-64l0-64-64 0 0 64zm-64-96l224 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L224 0c-35.3 0-64 28.7-64 64l0 224c0 35.3 28.7 64 64 64z"
          fill="rgba(66,193,110,1)"
        /></svg
      >

      <span class="quantity"> {player.numDuplicates} </span>
      <span class="text text--3"> Duplicati </span>
    </div>
    <div class="item item--4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
        ><path
          d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"
          fill="rgba(220,91,183,1)"
        />
      </svg>

      <span class="quantity"> {player.numStreaks} </span>
      <span class="text text--4"> Streak </span>
    </div>
  </div>
</div>


