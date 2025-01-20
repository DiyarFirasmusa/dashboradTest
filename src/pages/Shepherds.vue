<template>
  <v-container style="margin: 0; padding: 0; padding-left: 1.2rem;">
    <v-btn color="blue" block @click="openDialog">Add New Card</v-btn>
  
    <v-row class="mt-2">
      <v-col v-for="(item, index) in paginatedItems" :key="index" cols="12" sm="6" md="4">
        <v-card class="mx-auto bg-grey-lighten-2" max-width="400">
          <v-img :src="item.imgSrc" height="200px" alt="Card Image"></v-img>
          <v-card-title>
            <span class="headline">{{ item.title }}</span>
          </v-card-title>
          <v-card-subtitle>
            {{ item.description }}
          </v-card-subtitle>
          <v-card-actions>
            <v-icon icon="delete" color="red" @click="conformDelete(item)" class="ml-2"></v-icon>
            <v-icon icon="edit" color="green" @click="openDialog('edit', item)" class="ml-2"></v-icon>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirm Delete</v-card-title>
        <v-card-text>Are you sure you want to delete this item?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="closeDeleteDialog">Cancel</v-btn>
          <v-btn color="red" @click="confirmDeleteItem">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-pagination
      v-model="page"
      :length="pageCount"
      @input="paginateItems"
      color="black"
      class="mt-3"
    ></v-pagination>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>{{ isEditing ? 'Edit Card' : 'Add New Card' }}</v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <VTextField v-model="newItem.title" label="Title" :rules="[required]" ></VTextField>
            <VTextField v-model="newItem.description" label="Card Description" :rules="[required]" ></VTextField>
            <VTextField v-model="newItem.imgSrc" label="Image URL" :rules="[required, validUrl]" ></VTextField>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog" color="secondary">Cancel</v-btn>
          <v-btn @click="saveItem" color="primary">
            {{ isEditing ? 'Save' : 'Add' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed,watch  } from 'vue';
import { VForm, VTextField } from 'vuetify/components';


const dialog = ref(false);
const deleteDialog = ref(false);

const items = ref([
  { title: 'Card Title 1', description: 'Some interesting description goes here.', imgSrc: 'https://via.placeholder.com/400' },
  { title: 'Card Title 2', description: 'Another interesting description.', imgSrc: 'https://via.placeholder.com/400' },
  { title: 'Card Title 3', description: 'Yet another description.', imgSrc: 'https://via.placeholder.com/400' },
  { title: 'Card Title 4', description: 'Description for the fourth card.', imgSrc: 'https://via.placeholder.com/400' },
  { title: 'Card Title 5', description: 'Fifth card description.', imgSrc: 'https://via.placeholder.com/400' },
  { title: 'Card Title 6', description: 'Sixth card description.', imgSrc: 'https://via.placeholder.com/400' },
  { title: 'Card Title 7', description: 'Seventh card description.', imgSrc: 'https://via.placeholder.com/400' },
  { title: 'Card Title 8', description: 'Eighth card description.', imgSrc: 'https://via.placeholder.com/400' },
  { title: 'Card Title 9', description: 'Ninth card description.', imgSrc: 'https://via.placeholder.com/400' },
]);

const newItem = ref({ title: '', description: '', imgSrc: '' });
const itemToDelete = ref(null);
const isEditing = ref(false);
const editingIndex = ref(-1);

const page = ref(1);
const itemsPerPage = 3;

const pageCount = computed(() => Math.ceil(items.value.length / itemsPerPage));

const paginatedItems = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return items.value.slice(start, end);
});

// قوانين التحقق
const required = value => !!value || 'This field is required';
const validUrl = value => /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(value) || 'Please enter a valid URL';

const valid = ref(false); // متغير للتحقق من صحة النموذج

function openDialog(mode, item) {
  isEditing.value = (mode === 'edit');
  if (isEditing.value) {
    newItem.value = { ...item };
    editingIndex.value = items.value.indexOf(item);
  } else {
    newItem.value = { title: '', description: '', imgSrc: '' };
  }
  dialog.value = true;
}

function saveItem() {
  if (valid.value) {
    console.log('Form is valid');
    if (isEditing.value) {
      items.value[editingIndex.value] = { ...newItem.value };
    } else {
      items.value.push({ ...newItem.value });
    }
    closeDialog();
  } else {
    console.log('Form is invalid');
  }
}

function closeDialog() {
  dialog.value = false;
}

function conformDelete(item) {
  itemToDelete.value = item;
  deleteDialog.value = true;
}

function confirmDeleteItem() {
  const index = items.value.indexOf(itemToDelete.value);
  if (index !== -1) {
    items.value.splice(index, 1);
  }
  closeDeleteDialog();
}

function closeDeleteDialog() {
  deleteDialog.value = false;
  itemToDelete.value = null;
}

function paginateItems() {
  // Logic for pagination can go here
}
</script>
