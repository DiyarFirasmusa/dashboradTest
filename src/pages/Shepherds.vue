<template>
  <v-container style="margin: 0; padding: 0; padding-left: 1.2rem;">
    <v-btn color="blue" block @click="openDialog">Add New Card</v-btn>

    <v-row class="mt-2">
      <v-col v-for="(item, index) in paginatedItems" :key="index" cols="12" sm="6" md="4">
        <v-card class="mx-auto bg-grey-lighten-2" max-width="400">
          <v-img :src="item.url" height="200px" alt="Card Image"></v-img>
          <v-card-actions>
            <v-icon icon="delete" color="red" @click="confirmDelete(item)" class="ml-2"></v-icon>
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
            <VTextField v-model="newItem.url" label="Image URL" :rules="[required, validUrl]" ></VTextField>
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
import { ref, computed, onMounted } from 'vue';
import { VForm, VTextField } from 'vuetify/components';
import axios from 'axios';

const dialog = ref(false);
const deleteDialog = ref(false);

const items = ref([]);
const newItem = ref({ url: '' });
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

// Validation rules
const required = value => !!value || 'This field is required';
const validUrl = value => /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(value) || 'Please enter a valid URL';

const valid = ref(false);

// Authentication token
const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMiLCJleHAiOjE3Njg5Mjc0OTcsImlzcyI6ImhheWRlcjIwMDIxMi5jb20iLCJhdWQiOiJodHRwczovL2hheWRlcjIwMDIxMi5jb20ifQ.w6Wh1NaMT3CnODyG_O9gBKejIamLcnLeaLo20KuAWB7eztJrBmfnq8YKgEbZTP9h9_6PlWne8fc6Z_Jba_0VuA"; // Replace with your token

// Fetch all slider items from API
onMounted(async () => {
  await fetchItems();
});

// Fetch items from the API
async function fetchItems() {
  try {
    const response = await axios.get('http://ao8kgskw4wcs0ck48sgwg440.194.163.168.91.sslip.io/api/Slider', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    items.value = response.data; // Assuming the response is an array of slider items
  } catch (error) {
    console.error('Error fetching items:', error);
  }
}

// Add or edit an item
async function saveItem() {
  console.log('enter save functios')
  if (valid.value) {
    try {
      if (isEditing.value) {
        // Edit an existing item (PUT request)
        const response = await axios.put(
      `http://ao8kgskw4wcs0ck48sgwg440.194.163.168.91.sslip.io/api/Slider/${newItem.value.id}`,
      null, // No body is sent
      {
        params: { url: newItem.value.url }, // Pass the `url` parameter in the query string
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
        );
        if (response.status === 200) {
          items.value[editingIndex.value] = { ...newItem.value };
        }
      } else {
        // Add a new item (POST request
        console.log('add new item:',newItem.value.url)
        const response = await axios.post(
      ` http://ao8kgskw4wcs0ck48sgwg440.194.163.168.91.sslip.io/api/Slider`,
          null, // No body is sent
          {
            params: { url: newItem.value.url }, // Pass the `url` parameter in the query string
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.status === 200) {
          items.value.push({ ...newItem.value });
        }
      }
      closeDialog();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  } else {
    console.log('Form is invalid');
  }
}

// Open dialog for adding or editing item
function openDialog(mode, item) {
  isEditing.value = (mode === 'edit');
  console.log('isEditing value:', isEditing.value);  // Check if it logs correctly

  if (isEditing.value) {
    newItem.value = { ...item };  // Make sure it copies the item data
    editingIndex.value = items.value.indexOf(item);
  } else {
    newItem.value = { url: '' };  // Reset form for new item
  }

  dialog.value = true;
}


// Close the dialog
function closeDialog() {
  dialog.value = false;
}

// Confirm delete item
function confirmDelete(item) {
  itemToDelete.value = item;
  deleteDialog.value = true;
}

// Delete the item from the API
async function confirmDeleteItem() {
  try {
    const response = await axios.delete(`http://ao8kgskw4wcs0ck48sgwg440.194.163.168.91.sslip.io/api/Slider/${itemToDelete.value.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      const index = items.value.indexOf(itemToDelete.value);
      if (index !== -1) {
        items.value.splice(index, 1);
      }
    }
    closeDeleteDialog();
  } catch (error) {
    console.error('Error deleting item:', error);
  }
}

// Close delete dialog
function closeDeleteDialog() {
  deleteDialog.value = false;
  itemToDelete.value = null;
}

// Pagination logic
function paginateItems() {
  // Logic for pagination can go here
}
</script>
