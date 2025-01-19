<script setup lang="ts">
import { ref, computed } from 'vue';

// import icons
// import { ChevronUpIcon, ChevronDownIcon } from 'vue-tabler-icons';

const revenues = ref([
  {
    name: 'Bajaj Finery',
    price: 145.58,
    profit: 10
  },
  {
    name: 'TTML',
    price: 6.368,
    profit: 10
  },
  {
    name: 'Reliance',
    price: 458.63,
    profit: 10
  },
  {
    name: 'TTML',
    price: 5.631,
    profit: 10
  },
  {
    name: 'Stolon',
    price: 6.368,
    profit: 10
  }
]);
</script>

<template>
  <v-card elevation="0">
    <v-card variant="outlined" class="bg-light-blue-lighten-2">
      <v-card-text>
        <div class="d-flex align-center">
          <h4 class=" pl-4 text-xl text-white">Popular Stocks</h4>
          <div class="ml-auto">
            <v-menu transition="slide-y-transition">
              <template v-slot:activator="{ props }">
                <v-btn color="white" size="small" icon rounded="sm" variant="text" v-bind="props">
                  <span class="material-icons">more_vert</span>
                </v-btn>
              </template>
              <v-sheet rounded="md" width="150" class="elevation-10">
                <v-list class="bg-white">
                  <v-list-item value="1">
                    <v-list-item-title>Today</v-list-item-title>
                  </v-list-item>
                  <v-list-item value="2">
                    <v-list-item-title>This Month</v-list-item-title>
                  </v-list-item>
                  <v-list-item value="3">
                    <v-list-item-title>This Year</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-sheet>
            </v-menu>
          </div>
        </div>
        <div class="mt-4">
          <perfect-scrollbar v-bind:style="{ height: '270px' }">
            <v-list lines="two" class="py-0 bg-light-blue-lighten-2">
              <v-list-item v-for="(revenue, i) in revenues" :key="i" :value="revenue" color="secondary" rounded="sm">
                <template v-slot:append>
                  <div
                    class="bg-lightsuccess rounded-sm d-flex align-center justify-center ml-3"
                    style="width: 20px; height: 20px"
                    v-if="revenue.price > 145"
                  >
                    <span class="material-icons text-success">arrow_upward</span>
                  </div>
                  <div
                    class="bg-lighterror rounded-sm d-flex align-center justify-center ml-3"
                    style="width: 20px; height: 20px"
                    v-else
                  >
                    <span class="material-icons text-error">arrow_downward</span>
                  </div>
                </template>
                <div class="d-inline-flex align-center justify-space-between w-100">
                  <div>
                    <h6 class="text-subtitle-1 text-white font-weight-bold">
                      {{ revenue.name }}
                    </h6>
                    <span v-if="revenue.price > 145" class="text-black text-subtitle-2">{{ revenue.profit }}% Profit</span>
                    <span v-else class="text-black text-subtitle-2">{{ revenue.profit }}% Profit</span>
                  </div>

                  <div class="ml-auto text-subtitle-1 text-medium-emphasis font-weight-bold">${{ revenue.price }}</div>
                </div>
              </v-list-item>
            </v-list>
          </perfect-scrollbar>
        </div>
      </v-card-text>
    </v-card>
  </v-card>
</template>
