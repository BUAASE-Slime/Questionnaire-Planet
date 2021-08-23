<template>
  <div>
    <div class="box">
      <statside :pid="pid"></statside>
      <!-- style="position:fixed; z-index:1" -->
      <router-view v-on:pid="getPidFromChild"/>
    </div>
  </div>
</template>

<script>
import statside from './statside'
export default {
  data() {
    return {
      pid: '',
    }
  },
  components:{
    statside
  },
  methods: {
    getPidFromChild(pid) {
      this.pid = pid;
    }
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
