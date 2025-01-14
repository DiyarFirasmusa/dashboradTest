<template>
  <v-container>
    <v-btn color="primary" @click="openDialog" block>Add New CPU</v-btn>

    <v-data-table
      v-model:page="page"
      :headers="headers"
      :items="filteredItems"
      :items-per-page="itemsPerPage"
      item-value="name"
      :search="search"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          class="pa-2"
          label="Search (UPPER CASE ONLY)"
        ></v-text-field>
  
        <v-text-field
          :model-value="itemsPerPage"
          class="pa-2"
          label="Items per page"
          max="15"
          min="-1"
          type="number"
          hide-details
          @update:model-value="itemsPerPage = parseInt($event, 10)"
        ></v-text-field>
      </template>
  
      <template v-slot:item.actions="{ item }">
        <v-btn color="red" @click="deleteItem(item)">Delete</v-btn>
      </template>
  
      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination
            v-model="page"
            :length="pageCount"
          ></v-pagination>
        </div>
      </template>
    </v-data-table>

    <!-- Dialog for adding new CPU -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Add New CPU</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newItem.name"
            label="CPU Model"
            required
          ></v-text-field>
          <v-text-field
            v-model="newItem.cores"
            label="Cores"
            type="number"
            required
          ></v-text-field>
          <v-text-field
            v-model="newItem.threads"
            label="Threads"
            type="number"
            required
          ></v-text-field>
          <v-text-field
            v-model="newItem.baseClock"
            label="Base Clock"
            required
          ></v-text-field>
          <v-text-field
            v-model="newItem.boostClock"
            label="Boost Clock"
            required
          ></v-text-field>
          <v-text-field
            v-model="newItem.tdp"
            label="TDP (W)"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog" color="secondary">Cancel</v-btn>
          <v-btn @click="addItem" color="primary">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    search: '',
    page: 1,
    itemsPerPage: 5,
    dialog: false,
    newItem: {
      name: '',
      cores: null,
      threads: null,
      baseClock: '',
      boostClock: '',
      tdp: ''
    },
    headers: [
      { title: 'CPU Model', align: 'start', key: 'name' },
      { title: 'Cores', align: 'end', key: 'cores' },
      { title: 'Threads', align: 'end', key: 'threads' },
      { title: 'Base Clock', align: 'end', key: 'baseClock' },
      { title: 'Boost Clock', align: 'end', key: 'boostClock' },
      { title: 'TDP (W)', align: 'end', key: 'tdp' },
      { title: 'Actions', key: 'actions' },  // New column for delete button
    ],
    items: [
      { name: 'Intel Core i9-11900K', cores: 8, threads: 16, baseClock: '3.5 GHz', boostClock: '5.3 GHz', tdp: '125W' },
      { name: 'AMD Ryzen 9 5950X', cores: 16, threads: 32, baseClock: '3.4 GHz', boostClock: '4.9 GHz', tdp: '105W' },
      { name: 'Intel Core i7-10700K', cores: 8, threads: 16, baseClock: '3.8 GHz', boostClock: '5.1 GHz', tdp: '125W' },
      { name: 'AMD Ryzen 5 5600X', cores: 6, threads: 12, baseClock: '3.7 GHz', boostClock: '4.6 GHz', tdp: '65W' },
      { name: 'Intel Core i5-10600K', cores: 6, threads: 12, baseClock: '4.1 GHz', boostClock: '4.8 GHz', tdp: '125W' },
      { name: 'AMD Ryzen 7 5800X', cores: 8, threads: 16, baseClock: '3.8 GHz', boostClock: '4.7 GHz', tdp: '105W' },
      { name: 'Intel Core i3-10100', cores: 4, threads: 8, baseClock: '3.6 GHz', boostClock: '4.3 GHz', tdp: '65W' },
      { name: 'AMD Ryzen 3 3300X', cores: 4, threads: 8, baseClock: '3.8 GHz', boostClock: '4.3 GHz', tdp: '65W' },
      { name: 'Intel Pentium Gold G6400', cores: 2, threads: 4, baseClock: '4.0 GHz', tdp: '58W' },
      { name: 'AMD Athlon 3000G', cores: 2, threads: 4, baseClock: '3.5 GHz', tdp: '35W' },
    ],
  }),

  computed: {
    filteredItems() {
      return this.items.filter(item =>
        item.name.toUpperCase().includes(this.search.toUpperCase())
      );
    },
    pageCount() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
  },

  methods: {

    deleteItem(item) {
      const index = this.items.findIndex(i => i.name === item.name);
      if (index !== -1) {
        this.items.splice(index, 1);  // Remove the item from the list
      }
    },

    openDialog() {
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
      this.resetNewItem();
    },

    addItem() {
      if (this.newItem.name && this.newItem.cores && this.newItem.threads && this.newItem.baseClock && this.newItem.boostClock && this.newItem.tdp) {
        this.items.push({ ...this.newItem });
        this.closeDialog();
      }
    },

    resetNewItem() {
      this.newItem = {
        name: '',
        cores: null,
        threads: null,
        baseClock: '',
        boostClock: '',
        tdp: ''
      };
    },
  },
};
</script>
