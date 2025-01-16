<template>
    <v-container style="margin: 0; padding: 0; padding-left: 1.2rem;">
      <v-btn color="blue" block @click="openDialog">Add New Card</v-btn>
    
      <v-row class="mt-2">
        <v-col v-for="(item, index) in items" :key="index" cols="12" sm="6" md="4">
          <v-card class="mx-auto bg-grey-lighten-2" max-width="400">
            <v-img
              :src="item.imgSrc"
              height="200px"
              alt="Card Image"
            ></v-img>
    
            <v-card-title>
              <span class="headline">{{ item.title }}</span>
            </v-card-title>
            <v-card-subtitle>
              {{ item.description }}
            </v-card-subtitle>
    
            <v-card-actions>
              <v-icon  icon="delete" color="red" @click="deleteItem(item)" class="ml-2"></v-icon>
              <v-icon  icon="edit" color="green" @click="openDialog('edit', item)" class="ml-2"></v-icon>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
        <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>{{ isEditing ? 'Edit Card' : 'Add New Card' }}</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="form.title"
              label="Card Title"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.description"
              label="Card Description"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.imgSrc"
              label="Image URL"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="closeDialog" color="secondary">Cancel</v-btn>
            <v-btn @click="saveItem" color="primary">{{ isEditing ? 'Save' : 'Add' }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const items = ref([
    { title: 'Card Title 1', description: 'Some interesting description goes here.', imgSrc: 'https://via.placeholder.com/400' },
    { title: 'Card Title 2', description: 'Another interesting description.', imgSrc: 'https://via.placeholder.com/400' },
    { title: 'Card Title 3', description: 'Yet another description.', imgSrc: 'https://via.placeholder.com/400' },
    { title: 'Card Title 4', description: 'Description for the fourth card.', imgSrc: 'https://via.placeholder.com/400' },
    { title: 'Card Title 5', description: 'Fifth card description.', imgSrc: 'https://via.placeholder.com/400' },
  ]);
  
  const dialog = ref(false);
  const form = ref({
    title: '',
    description: '',
    imgSrc: ''
  });
  
  const isEditing = ref(false);
  const editingIndex = ref(-1);
  
  function openDialog() {
    resetForm();
    isEditing.value = false;
    dialog.value = true;
  }
  
  function editItem(index) {
    form.value = { ...items.value[index] };
    isEditing.value = true;
    editingIndex.value = index;
    dialog.value = true;
  }
  
  function saveItem() {
    if (isEditing.value) {
      items.value[editingIndex.value] = { ...form.value };
    } else {
      items.value.push({ ...form.value });
    }
    closeDialog();
  }
  
  function closeDialog() {
    dialog.value = false;
  }
  
  function deleteItem(index) {
    items.value.splice(index, 1);
  }
  
  function resetForm() {
    form.value = {
      title: '',
      description: '',
      imgSrc: ''
    };
  }
  </script>
  

  