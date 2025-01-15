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

      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-app-bar-title>
            <div class=" flex items-center gap-3">
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      class="custom-btn">
                      <v-avatar color="surface-variant" class="custom-avatar"></v-avatar>
                    </v-btn>
                  </template>
                  <v-list class="custom-list">
                    <v-list-item
                      v-for="(item, index) in items"
                      :key="index"
                      :value="index"
                    >
                      <v-list-item-title @click="handlenavigate">{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
               </v-menu>
            </div>
        </v-app-bar-title>
        <template v-slot:append>
          <v-btn icon="dark_mode"></v-btn>
        </template>
      </v-app-bar>
  
      <v-main class="">     
        <div class=" p-6">
            <slot/>
        </div>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
    import { ref } from 'vue'

    defineProps({
      show: Boolean
    })
  
    const items = [
      { title: 'Profile' },
      { title: 'Settings' },
      { title: 'Log Out' },
    ]


    const links = [
      ['arrow_downward', 'Statistics', '/Statistics'],
      ['send', 'Services' , '/Services'],
      ['people', 'Shepherds' , '/Shepherds'],
      ['swap_vert', 'ScrollBar' , '/ScrollBar'],
      ['folder', 'Project' , '/Project'],
      ['import_contacts', 'Artacl' , '/Artacl'],
      ['info', 'About' , '/About'],
    ]
  
    const drawer = ref(null)
  </script>
  <style>
    .custom-vSheet {
      padding: 1.23rem !important;
    }
  .custom-btn {
    font-size: 18px !important;
  }
  
  .custom-avatar {
    border: 2px solid #1976D2 !important;
    width: 35px !important;
    height: 35px !important;
  }
  .custom-list {
    margin-top: 0.5rem !important;
  }
  </style>