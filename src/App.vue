<template>
  <div id="app">
    <SidebarElement></SidebarElement>
    <router-view></router-view>
  </div>
</template>

<script>

import SidebarElement from './pages/Sidebar.vue'

export default {
  name: 'App',
  components: {
    SidebarElement
  },
  methods: {
    filterDate(value){
      const date = new Date(value * 1000)
      return (date.toLocaleDateString('ru-RU') != "Invalid Date" ? date.toLocaleDateString('ru-RU') : new Date(value).toLocaleDateString('ru-RU'))
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
}
</style>
