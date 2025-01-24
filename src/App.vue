<template>
  <v-app>
    <v-main v-if="isAuthenticated">
      <Waraper>
        <router-view />
      </Waraper>
    </v-main>
    <v-main v-if="!isAuthenticated">
      <Login />
    </v-main>
  </v-app>
</template>

<script setup>
import Waraper from './layout/Waraper.vue';
import Login from './pages/Login.vue';
import './assets/main.css';
import { useAuth } from './useAuth.js'; // Import useAuth here

const { isAuthenticated } = useAuth();
</script>
