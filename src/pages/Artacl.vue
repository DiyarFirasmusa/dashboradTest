<template>
  <v-container style="padding: 0; margin: 0;" class="bg-white">
    <v-data-table
      v-model:page="page"
      :headers="headers"
      :items="paginatedItems"
      :items-per-page="itemsPerPage"
      item-value="id"
      :search="search"
      class="bg-white"
    >
      <template v-slot:top>
        <div class="flex justify-center">
          <v-btn
            style="margin-top: 0.6rem; height: 55px;"
            color="blue"
            @click="openDialog('add')"
            elevation="0"
          >
            Add New Article
          </v-btn>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="search"
                class="pa-2"
                label="Search by Title"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>

        <v-text-field
          v-model.number="itemsPerPage"
          class="pa-2"
          label="Items per page"
          max="15"
          min="1"
          type="number"
          hide-details
        ></v-text-field>
      </template>

      <template v-slot:item.image="{ item }">
        <v-img
          :src="item.image"
          max-height="50"
          max-width="50"
          class="rounded"
        ></v-img>
      </template>

      <template v-slot:item.Delete="{ item }">
        <v-icon
          icon="delete"
          color="red"
          @click="deleteItem(item)"
          class="ml-2"
        ></v-icon>
      </template>

      <template v-slot:item.Edit="{ item }">
        <v-icon
          icon="edit"
          color="green"
          @click="openDialog('edit', item)"
          class="ml-2"
        ></v-icon>
      </template>

      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </template>
    </v-data-table>

    <!-- Confirm Delete Dialog -->
    <v-dialog v-model="confirmDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Confirm Delete</v-card-title>
        <v-card-text>Are you sure you want to delete this item?</v-card-text>
        <v-card-actions>
          <v-btn color="secondary" text @click="cancelDelete">Cancel</v-btn>
          <v-btn color="red" text @click="confirmDeleteItem">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add/Edit Article Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>{{ dialogType === 'add' ? 'Add New Article' : 'Edit Article' }}</v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <v-text-field
              v-model="newItem.title"
              label="Title"
              :rules="[required]"
              required
            ></v-text-field>
            <v-textarea
              v-model="newItem.description"
              label="Description"
              :rules="[required]"
              required
            ></v-textarea>
            <v-text-field
              v-model="newItem.image"
              label="Image URL"
              :rules="[required, validateImage]"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog" color="secondary">Cancel</v-btn>
          <v-btn @click="saveItem" color="primary">{{ dialogType === 'add' ? 'Add' : 'Save' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios';

const API_URL = 'http://ao8kgskw4wcs0ck48sgwg440.194.163.168.91.sslip.io/api/Artical';
const TOKEN = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQiLCJleHAiOjE3NjkwMTI2NDEsImlzcyI6ImhheWRlcjIwMDIxMi5jb20iLCJhdWQiOiJodHRwczovL2hheWRlcjIwMDIxMi5jb20ifQ.begPYOpkzRRtMe81BhI_pcPMpUe7lXdyjZQE-08kYinXqSRia_xFylPLr2OAPSNviEREkvpQZNy6ms8uJi2VTw';

const search = ref('');
const page = ref(1);
const itemsPerPage = ref(5);
const dialog = ref(false);
const confirmDialog = ref(false);
const dialogType = ref('add');
const deleteTarget = ref(null);
const editingIndex = ref(null);
const valid = ref(false);

const newItem = ref({
  id: null,
  title: '',
  description: '',
  image: '',
  createdAt: ''
});

const headers = [
  { title: 'Title', align: 'start', key: 'title' },
  { title: 'Description', align: 'start', key: 'description' },
  { title: 'Image', align: 'start', key: 'image' },
  { title: 'Created At', align: 'start', key: 'createdAt' },
  { title: 'Delete', key: 'Delete' },
  { title: 'Edit', key: 'Edit' },
];

const items = ref([]);

async function fetchArticles() {
  try {
    const response = await axios.get(
      `${API_URL}?pageNumber=${page.value}&pageSize=${itemsPerPage.value}`,
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      }
    );
    items.value = response.data.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
}

watch([page, itemsPerPage], fetchArticles);

async function addArticle(article) {
  try {
    const { id, ...dataWithoutId } = article;
    const response = await axios.post(API_URL, dataWithoutId, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    items.value.push(response.data);
  } catch (error) {
    console.error('Error adding article:', error);
  }
}

async function updateArticle(id, article) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, article, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    const index = items.value.findIndex(item => item.id === id);
    if (index !== -1) items.value[index] = response.data;
  } catch (error) {
    console.error('Error updating article:', error);
  }
}

async function deleteArticle(id) {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    items.value = items.value.filter(item => item.id !== id);
  } catch (error) {
    console.error('Error deleting article:', error);
  }
}

const paginatedItems = computed(() => items.value);

function deleteItem(item) {
  deleteTarget.value = item;
  confirmDialog.value = true;
}

async function confirmDeleteItem() {
  if (deleteTarget.value) await deleteArticle(deleteTarget.value.id);
  confirmDialog.value = false;
  deleteTarget.value = null;
}

function cancelDelete() {
  confirmDialog.value = false;
  deleteTarget.value = null;
}

function openDialog(type, item) {
  dialogType.value = type;
  if (type === 'edit' && item) {
    editingIndex.value = items.value.indexOf(item);
    newItem.value = { ...item };
  } else {
    resetNewItem();
  }
  dialog.value = true;
}

function closeDialog() {
  dialog.value = false;
  resetNewItem();
}

async function saveItem() {
  if (valid.value) {
    if (dialogType.value === 'add') {
      await addArticle({ ...newItem.value });
    } else if (dialogType.value === 'edit' && editingIndex.value !== -1) {
      await updateArticle(newItem.value.id, { ...newItem.value });
    }
    closeDialog();
    fetchArticles();
  }
}

function resetNewItem() {
  newItem.value = {
    id: null,
    title: '',
    description: '',
    image: '',
    createdAt: ''
  };
}

const required = value => !!value || 'This field is required';
const validateImage = (value) => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // Protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*))\\.)*' + // Subdomain and domain name
    '[a-z]{2,}' + // TLD
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
    '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  return urlPattern.test(value) || 'Invalid image URL';
};


onMounted(fetchArticles);
</script>
