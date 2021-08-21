<template>
  <div id="app">
    <pageHeader></pageHeader>
    <router-view/>
  </div>
</template>

<script>
import pageHeader from "./components/header/pageHeader";
import PageHeader from "./components/header/pageHeader";

export default {
  name: 'App',
  components: {PageHeader},
  component:{
    pageHeader
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
  background-color: #f3f3f3;
}
</style>
