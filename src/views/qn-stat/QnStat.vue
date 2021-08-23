<template>
  <div>
    <div class="box">
      <statside ></statside>
      <!-- style="position:fixed; z-index:1" -->
      <router-view /> 
    </div>
  </div>
</template>

<script>
import statside from './statside'
export default {
  components:{
    statside
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.box {
  display: flex;
  margin-top: 20px;
}

</style>
