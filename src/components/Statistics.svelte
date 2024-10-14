<script>
  import { onMount } from "svelte";
  import { matchStatistics } from "../stores/Stores";
  import StatCard from "./StatCard.svelte";
  
  onMount(() => {
    const modal = new bootstrap.Modal(
      document.getElementById("statisticsModal")
    );
    modal.show();
  });
</script>
<style>
  .modal {
    --bs-modal-width: 650px;
   
  }

</style>
<!-- Modale statistiche: compare al termine di una partita -->
<div
  class=" modal fade"
  id="statisticsModal"
  data-bs-backdrop="static"
  data-bs-keyboard="false"
  tabindex="-1"
  aria-labelledby="staticBackdropLabel"
  aria-hidden="true"
>
  <div class=" modal-dialog">
    <div class=" modal-content">
      <div class="row d-flex justify-content-between p-sm-4">
        <div class=" col-sm-6">
          <StatCard player={$matchStatistics.players[0]} />
        </div>
        <div class=" col-sm-6">
          <StatCard player={$matchStatistics.players[1]} />
        </div>
        <button type="button" class=" btn btn-dark mt-3" data-bs-dismiss="modal"
          >Chiudi</button
        >
      </div>
    </div>
  </div>
</div>


