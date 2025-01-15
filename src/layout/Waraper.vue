<template>
    <v-app id="inspire" class="">
      <v-navigation-drawer v-model="drawer" >
        <v-sheet class="custom-vSheet" >
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
            <NavBar :showw = 'show'/>
            <slot/>
        </div>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
    import { ref } from 'vue'
    import NavBar from './NavBar.vue'

    defineProps({
      show: Boolean
    })
  
    const links = [
      ['arrow_downward', 'Statistics', '/Statistics'],
      ['send', 'Services' , '/Services'],
      ['people', 'Shepherds' , '/Shepherds'],
      ['Scroll', 'ScrollBar' , '/ScrollBar'],
      ['Project', 'Project' , '/Project'],
      ['Artacl', 'Artacl' , '/Artacl'],
      ['About', 'About' , '/About'],
    ]
  
    const drawer = ref(null)
  </script>

  <style>
    .custom-vSheet {
      padding: 1.23rem !important;
    }
  </style>