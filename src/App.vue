<template>
  <div id="app">
    <pageHeader v-if="!$route.meta.noNav"/>
    <router-view/>
  </div>
</template>

<script>
import PageHeader from "./components/header/pageHeader";
import user from "@/store/user";

export default {
  name: 'App',
  components: {
    PageHeader
  },
  data() {
    return {
      isLogin: false,
    }
  },
  mounted() {
    const userInfo = user.getters.getUser(user.state())
    if (userInfo)
      this.isLogin = true
  }
}
</script>

<style>
#app {
  min-height: 800px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(241, 241, 241);
}
</style>
