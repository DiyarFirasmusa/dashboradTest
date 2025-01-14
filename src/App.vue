<template>
  <v-app>
    <v-main>
      <Waraper>
        <router-view />
      </Waraper>
    </v-main>
  </v-app>
</template>

<script setup>
import Waraper from './layout/Waraper.vue';
import './assets/main.css';
</script>
