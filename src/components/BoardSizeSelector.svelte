<script>
  import { generateBoardGame, boardGameSize } from "../stores/Stores";

  let errorMessage = {
    height: "",
    width: "",
    dimensionValid: false,
  };

  export function validateBoardDimensions() {
    if ($boardGameSize.height < 5) {
      errorMessage = {
        height: "L'altezza deve essere di almeno 5 caselle",
        width: "",
        dimensionValid: false,
      };
      return false;
    } else if ($boardGameSize.height > 12) {
      errorMessage = {
        height: "L'altezza deve essere di massimo 12 caselle",
        width: "",
        dimensionValid: false,
      };
      return false;
    } else {
      errorMessage = {
        height: "",
        width: "",
        dimensionValid: false,
      };
    }

    if ($boardGameSize.width < 5) {
      errorMessage = {
        height: "",
        width: "La largehezza deve essere di almeno 5 caselle",
        dimensionValid: false,
      };
      return false;
    } else if ($boardGameSize.width > 12) {
      errorMessage = {
        height: "",
        width: "La largehezza deve essere di massimo 12 caselle",
        dimensionValid: false,
      };
      return false;
    } else {
      errorMessage = {
        height: "",
        width: "",
        dimensionValid: true,
      };
    }
    
    return true;
  }
</script>

<!-- <div class="container mt-5">
  <div class="row mb-3">
    <div class="col">
      <h4 class="text-center fw-light fs-1">Scegli il formato di gioco</h4>
    </div>
  </div>
  <div class="row">
    <div class="col d-flex-column d-md-flex">
      <button
        class="btn btn-outline-primary me-5 d-block w-100 mb-3 mb-md-0 p-3 fs-3"
        on:click={() => {
          generateBoardGame("5x5");
        }}
      >
        5 x 5
      </button>
      <button
        class="btn btn-outline-primary d-block w-100 p-3 fs-3"
        on:click={() => {
          generateBoardGame("7x6");
        }}
      >
        7 x 6
      </button>
    </div>
  </div>
</div> -->

<div class="container mt-5">
  <h1 class="mb-4">Inserisci le dimensioni della plancia da gioco</h1>
  <div class="mb-3">
    <label for="boardHeight" class="form-label">Numero righe</label>
    <input
      type="number"
      class="form-control"
      id="boardHeight"
      aria-describedby="emailHelp"
      required
      bind:value={$boardGameSize.height}
      on:input={validateBoardDimensions}
    />
  </div>
  {#if validateBoardDimensions}
    <p class="text-danger" style="font-size: 14px;">{errorMessage.height}</p>
  {/if}
  <div class="mb-3">
    <label for="boardHeight" class="form-label">Numero colonne</label>
    <input
      type="number"
      class="form-control"
      id="boardHeight"
      aria-describedby="emailHelp"
      required
      bind:value={$boardGameSize.width}
      on:input={validateBoardDimensions}
    />
  </div>
  {#if validateBoardDimensions}
    <p class="text-danger" style="font-size: 14px;">{errorMessage.width}</p>
  {/if}
  <div class=" d-flex justify-content-center">
    <button
      disabled={!errorMessage.dimensionValid}
      type="submit"
      class=" btn btn-dark p-4 mt-4 title w-25"
      on:click={generateBoardGame($boardGameSize)}>Inizia</button
    >
  </div>
</div>

<style>
  button.title {
    font-size: 2vw;
    font-weight: normal;
    letter-spacing: normal;
  }

  @media only screen and (max-width: 576px) {
    button.title {
      font-size: 4vw;
    }
  }
</style>
