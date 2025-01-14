<template>
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer">
        <v-sheet class=" p-4 pb-6">
          <h1>hello world</h1>
        </v-sheet>
  
        <v-divider></v-divider>
  
        <v-list>
          <v-list-item
            v-for="[icon, text , path] in links"
            :key="icon"
            :prepend-icon="icon"
            :title="text"
            :to = "path"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-main class="">     
        <div class=" p-6">
            <NavBar/>
            <slot/>
        </div>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
    import { ref } from 'vue'
    import NavBar from './NavBar.vue'
  
    const links = [
      ['arrow_downward', 'Statistics', '/Statistics'],
      ['send', 'Services' , '/Services'],
    ]
  
    const drawer = ref(null)
  </script>