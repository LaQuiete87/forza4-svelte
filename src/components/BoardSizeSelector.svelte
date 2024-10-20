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


<div class="container mt-5">
  <h1 class="mb-4 text-center" >Inserisci le dimensioni della plancia da gioco</h1>
  <div class="mb-3 text-center">
    <label for="boardHeight" class="form-label fw-semibold">Numero righe</label>
    <input
      type="number"
      class="form-control text-center fs-4 fw-bold w-25 mx-auto border-4" 
      id="boardHeight"
      aria-describedby="emailHelp"
      required
      bind:value={$boardGameSize.height}
      on:input={validateBoardDimensions}
    />
  </div>
  {#if validateBoardDimensions}
    <p class="text-danger text-center" style="font-size: 14px;">{errorMessage.height}</p>
  {/if}
  <div class="mb-3 text-center">
    <label for="boardHeight" class="form-label fw-semibold ">Numero colonne</label>
    <input
      type="number"
      class="form-control  text-center fs-4 fw-bold w-25 mx-auto border-4"
      id="boardHeight"
      aria-describedby="emailHelp"
      required
      bind:value={$boardGameSize.width}
      on:input={validateBoardDimensions}
    />
  </div>
  {#if validateBoardDimensions}
    <p class="text-danger text-center" style="font-size: 14px;">{errorMessage.width}</p>
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
