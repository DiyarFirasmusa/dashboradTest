<script setup lang="ts">
import { shallowRef } from 'vue';
const items = shallowRef([
  { title: 'Import Card', icon: 'download' },
  { title: 'Copy Data', icon: 'content_copy' },
  { title: 'Export', icon: 'file_upload' },
  { title: 'Archive File', icon: 'archive' }
]);

const defaultImage = 'https://via.placeholder.com/25'; // Default image
</script>

<template>
  <v-card elevation="0" class="custom-card">
    <v-card-text>
      <div class="custom-header">
        <v-btn color="blue" icon rounded="rounded-sm" variant="flat">
          <span 
            class="material-icons" 
            style="font-size: 25px; color: #ff9800 !important;"
          >
            store
          </span>
        </v-btn>
        <div class="menu-container">
          <v-menu :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-btn icon rounded="rounded-sm" color="#42A5F5" variant="flat" size="small" v-bind="props">
                <span class="material-icons custom-menu-icon">more_vert</span>
              </v-btn>
            </template>
            <v-sheet rounded="rounded-sm" class="menu-sheet">
              <v-list density="compact">
                <v-list-item v-for="(item, index) in items" :key="index" :value="index">
                  <template v-slot:prepend>
                    <span class="material-icons custom-list-icon">{{ item.icon }}</span>
                  </template>
                  <v-list-item-title class="custom-list-title">{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-menu>
        </div>
      </div>
      <h2 class="custom-total">
        $500.00
        <a href="#" class="custom-link">
          <span class="material-icons custom-arrow-icon">arrow_outward</span>
        </a>
      </h2>
      <span class="custom-earning">Total Earning</span>
    </v-card-text>
  </v-card>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

/* Custom styles for the component */
.custom-card {
  background: #42A5F5
  !important;
  overflow: hidden !important;
  border-radius: 16px !important;
}

.custom-header {
  display: flex !important;
  align-items: flex-start !important;
  margin-bottom: 24px !important;
}

.custom-image {
  width: 25px !important;
}

.menu-container {
  margin-left: auto !important;
  z-index: 1 !important;
}

.custom-menu-icon {
  font-size: 20px !important;
}

.menu-sheet {
  padding: 0 !important;
  width: 150px !important;
}

.custom-list-icon {
  font-size: 20px !important;
  color: #555 !important;
}

.custom-list-title {
  margin-left: 8px !important;
}

.custom-total {
  font-size: 24px !important;
  font-weight: 500 !important;
  display: flex !important;
  align-items: center !important;
}

.custom-link {
  text-decoration: none !important;
  margin-left: 8px !important;
  color: inherit !important;
}

.custom-arrow-icon {
  font-size: 28px !important;
  color: white !important;
}

.custom-earning {
  font-size: 14px !important;
  color: var(--v-text-secondary) !important;
}
</style>
