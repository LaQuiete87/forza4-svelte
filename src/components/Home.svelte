<script>
    import {showHome} from "../stores/Stores"; 
</script>

<div class="container mt-5 d-flex flex-column">
  <div class="row my-5 my-sm-0">
    <div class="col">
      <h1 class="text-center title">
        FORZA <span class="no-space">4</span>
      </h1>
    </div>
  </div>
  <div id="logo" class="row">
    <div class="col">
      <img src="/assets/logo.svg" alt="" />
    </div>
  </div>
  <div class="row my-5">
    <div class="col text-center">
        <button class=" btn btn-dark p-4 mt-4 title w-50" on:click={()=>{showHome.set(false)}}> Entra</button>
    </div>
  </div>
</div>

<style>
  .title {
    font-size: 12vw;
    font-weight: lighter;
    letter-spacing: 3vw;
  }
  #logo {
    min-width: 330px;
    max-width: 20vw;
    margin: 0 auto;
  }
  img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
  }
  .no-space {
    letter-spacing: 0;
  }
  button.title{
    font-size: 5vw;
    font-weight:normal;
    letter-spacing: normal;
  }
</style>
