<script>
  import { onMount } from "svelte";
  import { matchStatistics } from "../stores/Stores"; // Importa lo store e la funzione
import StatCard from "./StatCard.svelte";

  $matchStatistics;
  onMount(() => {
    const modal = new bootstrap.Modal(document.getElementById('statisticsModal'));
    modal.show(); 
  });
</script>



  <div class=" modal fade" id="statisticsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class=" modal-dialog">
      <div class=" modal-content">
        <!-- Qui vanno le due StatCArd -->
         <StatCard />
         <StatCard />
        <button type="button" class=" btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
  </div>
  </div>