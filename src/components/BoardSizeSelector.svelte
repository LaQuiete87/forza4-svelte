<script>
 
import { generateBoardGame } from "../stores/Stores";

</script>

<div class="container mt-5">

  
   
  
  <div class="row mb-3">
    <div class="col">
      <h4 class="text-center fw-light fs-1">Scegli il formato di gioco</h4>
    </div>
  </div>
  
  <div class="row">
    <div class="col d-flex-column d-md-flex">
      <button
        class="btn btn-outline-primary me-5 d-block w-100 mb-3 mb-md-0 p-3 fs-3"
        on:click={()=>{generateBoardGame("5x5")}}
      >
        5 x 5
      </button>
  
      <button
        class="btn btn-outline-primary d-block w-100 p-3 fs-3"
        on:click={()=>{generateBoardGame("7x6")}}
      >
        7 x 6
      </button>
    </div>
  
  </div>
  
</div>