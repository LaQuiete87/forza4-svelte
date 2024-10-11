<script>
  import { onMount } from "svelte";
  import { matchStatistics } from "../stores/Stores"; // Importa lo store e la funzione

  $matchStatistics;
  onMount(() => {
 
    const modal = new bootstrap.Modal(document.getElementById('statisticsModal'));
    modal.show(); 
  });
</script>

<style>
 
</style>


  <div class=" modal fade" id="statisticsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class=" modal-dialog">
      <div class=" modal-content">
        <p>contenuto</p>
        <button type="button" class=" btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
  </div>
  </div>