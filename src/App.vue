<script setup>
import { RouterView,RouterLink} from 'vue-router'
</script>

<template>
 <div class="mainpage">
  <RouterView />
 </div>
  <!-- <br>
  <RouterLink to="/detail">to detail</RouterLink><br>
  <RouterLink to="/">to Home</RouterLink> -->
</template>
<style>
.mainpage{
  margin: 0 auto;
  padding: 50px;
  width: 80vw;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  min-height: 100vh;
}

</style>