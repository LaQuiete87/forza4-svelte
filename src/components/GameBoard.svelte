<script>
 import { grid, playerColor } from "../stores/Stores";
  $grid;
  
</script>

<style>
    .boardGame {
      margin: 0;
    }
    td {
      width: 130px;
      height: 130px;
      text-align: center;
      vertical-align: middle;
    }
  
    .cell {
      background-repeat: no-repeat;
      background-size: contain;
      padding: 0;
      border: 1px solid red;
    }
  </style>
  
<div
  class="row d-flex flex-column flex-sm-row flex-lg-row justify-content-center align-items-center"
>
  <div class="col-12 col-lg-9">
    <table class="boardGame mx-auto">
      {#each $grid as row}
        <tr>
          {#each row as cell}
            <td class="cell" style={playerColor(cell)}></td>
          {/each}
        </tr>
      {/each}
    </table>
  </div>
</div>

