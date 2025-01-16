<template>
    <v-app id="inspire" class="bg-white">
      <v-navigation-drawer v-model="drawer" class="bg-grey-lighten-2" >
        <v-sheet class="custom-vSheet bg-grey-lighten-2 border-r flex justify-start items-center gap-2">
          <v-icon icon="$vuetify" size="x-large" color="blue"></v-icon>
          <h1 class="text-xl">Vercal Pro</h1>
        </v-sheet>
  
        <v-divider></v-divider>
  
        <v-list class="p-2">
          <v-list-item
            v-for="[icon, text, path] in links"
            :key="icon"
            :title="text"
            :to="path"
            class="hover-effect"
          >
            <template #prepend>
              <v-icon class="custom-icon">{{ icon }}</v-icon>
            </template>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar class="bg-grey-lighten-2 border-b-sm " :elevation="0">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-app-bar-title>
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      class="custom-btn">
                      <v-avatar color="surface-variant" class="custom-avatar"></v-avatar>
                    </v-btn>
                  </template>
                  <v-list class="custom-list bg-grey-lighten-2">
                    <v-list-item class="bg-grey-lighten-2 hover-effect" :value="0">
                      <v-list-item-title @click="handlenavigate" class="p-2 w-44">Profile</v-list-item-title>
                    </v-list-item>
                    <v-list-item class="bg-grey-lighten-2 hover-effect" :value="1">
                      <v-list-item-title @click="handlenavigate" class="p-2 w-44">Settings</v-list-item-title>
                    </v-list-item>
                    <v-list-item class="bg-grey-lighten-2 hover-effect" :value="2">
                      <v-list-item-title @click="handlenavigate" class="p-2 w-44">Logout</v-list-item-title>
                    </v-list-item>
                  </v-list>
               </v-menu>
        </v-app-bar-title>
        <template v-slot:append>
          <v-btn icon="dark_mode"></v-btn>
        </template>
      </v-app-bar>
  
      <v-main class="">     
        <div class=" p-4">
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
      ['bar_chart', 'Statistics', '/Statistics'],
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
      padding: 1.24rem !important;
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

  .hover-effect {
  transition: background-color 0.3s ease, color 0.3s ease !important;
}
.hover-effect:hover {
  background-color: #f0f0f0 !important; /* Adjust to your preferred hover background color */
  color: #1976d2 !important; /* Adjust to your preferred hover text color */
}
.custom-icon {
  color: #2196F3; /* ضع اللون الذي تريده هنا */
}
  </style>