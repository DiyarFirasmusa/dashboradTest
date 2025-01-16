<template>
  <v-container style="padding: 0; margin: 0; " class="bg-white">
    

    <v-data-table
      v-model:page="page"
      :headers="headers"
      :items="filteredItems"
      :items-per-page="itemsPerPage"
      item-value="name"
      :search="search"
      class="bg-white"
    >
      <template v-slot:top>
        <div class="flex justify-between">
          <v-btn color="blue" @click="openDialog('add')" elevation="0" >Add New CPU</v-btn>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="search"
                class="pa-2"
                label="Search (UPPER CASE ONLY)"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>

  
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
  
      <template v-slot:item.image="{ item }">
        <v-avatar size="48">
          <img :src="item.image" alt="CPU Image">
        </v-avatar>
      </template>
  
      <template v-slot:item.Delete="{ item }">
        <v-icon  icon="delete" color="red" @click="deleteItem(item)" class="ml-2"></v-icon>
      </template>

      <template v-slot:item.Edit="{ item }">
        <v-icon  icon="edit" color="green" @click="openDialog('edit', item)" class="ml-2"></v-icon>
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

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>{{ dialogType === 'add' ? 'Add New CPU' : 'Edit CPU' }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newItem.name"
            label="CPU Model"
            required
          ></v-text-field>
          <v-text-field
            v-model="newItem.image"
            label="Image URL"
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
          <v-btn @click="saveItem" color="primary">{{ dialogType === 'add' ? 'Add' : 'Save' }}</v-btn>
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
    dialogType: 'add',
    newItem: {
      name: '',
      image: '',
      cores: null,
      threads: null,
      baseClock: '',
      boostClock: '',
      tdp: ''
    },
    editingIndex: -1,
    headers: [
      { title: 'Image', align: 'center', key: 'image' },
      { title: 'CPU Model', align: 'start', key: 'name' },
      { title: 'Cores', align: 'end', key: 'cores' },
      { title: 'Threads', align: 'end', key: 'threads' },
      { title: 'Base Clock', align: 'end', key: 'baseClock' },
      { title: 'Boost Clock', align: 'end', key: 'boostClock' },
      { title: 'TDP (W)', align: 'end', key: 'tdp' },
      { title: 'Delete', key: 'Delete' },
      { title: 'Edit', key: 'Edit' },
    ],
    items: [
      {
        name: 'Intel Core i9-11900K',
        image: 'https://via.placeholder.com/48',
        cores: 8,
        threads: 16,
        baseClock: '3.5 GHz',
        boostClock: '5.3 GHz',
        tdp: '125W',
      },
      {
        name: 'AMD Ryzen 9 5950X',
        image: 'https://via.placeholder.com/48',
        cores: 16,
        threads: 32,
        baseClock: '3.4 GHz',
        boostClock: '4.9 GHz',
        tdp: '105W',
      },
      {
        name: 'Intel Core i9-11900K',
        image: 'https://via.placeholder.com/48',
        cores: 8,
        threads: 16,
        baseClock: '3.5 GHz',
        boostClock: '5.3 GHz',
        tdp: '125W',
      },
      {
        name: 'Intel Core i9-11900K',
        image: 'https://via.placeholder.com/48',
        cores: 8,
        threads: 16,
        baseClock: '3.5 GHz',
        boostClock: '5.3 GHz',
        tdp: '125W',
      },
      {
        name: 'Intel Core i9-11900K',
        image: 'https://via.placeholder.com/48',
        cores: 8,
        threads: 16,
        baseClock: '3.5 GHz',
        boostClock: '5.3 GHz',
        tdp: '125W',
      },
      {
        name: 'Intel Core i9-11900K',
        image: 'https://via.placeholder.com/48',
        cores: 8,
        threads: 16,
        baseClock: '3.5 GHz',
        boostClock: '5.3 GHz',
        tdp: '125W',
      },
      {
        name: 'Intel Core i9-11900K',
        image: 'https://via.placeholder.com/48',
        cores: 8,
        threads: 16,
        baseClock: '3.5 GHz',
        boostClock: '5.3 GHz',
        tdp: '125W',
      },
      {
        name: 'Intel Core i9-11900K',
        image: 'https://via.placeholder.com/48',
        cores: 8,
        threads: 16,
        baseClock: '3.5 GHz',
        boostClock: '5.3 GHz',
        tdp: '125W',
      },
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
    openDialog(type, item = null) {
      this.dialogType = type;
      if (type === 'edit' && item) {
        this.editingIndex = this.items.findIndex(i => i.name === item.name);
        this.newItem = { ...item };
      } else {
        this.resetNewItem();
      }
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
      this.resetNewItem();
    },

    saveItem() {
      if (this.dialogType === 'add') {
        this.addItem();
      } else if (this.dialogType === 'edit' && this.editingIndex !== -1) {
        this.items.splice(this.editingIndex, 1, { ...this.newItem });
        this.closeDialog();
      }
    },

    addItem() {
      if (this.newItem.name && this.newItem.image && this.newItem.cores && this.newItem.threads && this.newItem.baseClock && this.newItem.boostClock && this.newItem.tdp) {
        this.items.push({ ...this.newItem });
        this.closeDialog();
      }
    },

    resetNewItem() {
      this.newItem = {
        name: '',
        image: '',
        cores: null,
        threads: null,
        baseClock: '',
        boostClock: '',
        tdp: '',
      };
      this.editingIndex = -1;
    },

    deleteItem(item) {
      const index = this.items.findIndex(i => i.name === item.name);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },
  },
};
</script>

<style>
  .custom-car-action {
    padding: 1rem !important;
  }
</style>
