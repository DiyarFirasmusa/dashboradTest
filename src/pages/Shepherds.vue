<template>
    <v-container>
      <!-- زر لإضافة كارد جديد -->
      <v-btn color="green" block @click="openDialog">Add New Card</v-btn>
    
      <v-row>
        <!-- كاردات متعددة -->
        <v-col v-for="(item, index) in items" :key="index" cols="12" sm="6" md="4">
          <v-card class="mx-auto" max-width="400">
            <!-- صورة داخل الكارد -->
            <v-img
              :src="item.imgSrc"
              height="200px"
              alt="Card Image"
            ></v-img>
    
            <!-- محتوى الكارد -->
            <v-card-title>
              <span class="headline">{{ item.title }}</span>
            </v-card-title>
            <v-card-subtitle>
              {{ item.description }}
            </v-card-subtitle>
    
            <!-- نص إضافي أو أزرار -->
            <v-card-actions>
              <!-- زر حذف -->
              <v-btn color="red" @click="deleteItem(index)">Delete</v-btn>
              <!-- زر تعديل -->
              <v-btn color="blue" @click="editItem(index)">Edit</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- نافذة منبثقة لإضافة وتعديل الكارد -->
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
  
  <script>
  export default {
    data() {
      return {
        // بيانات الكاردات
        items: [
          { title: 'Card Title 1', description: 'Some interesting description goes here.', imgSrc: 'https://via.placeholder.com/400' },
          { title: 'Card Title 2', description: 'Another interesting description.', imgSrc: 'https://via.placeholder.com/400' },
          { title: 'Card Title 3', description: 'Yet another description.', imgSrc: 'https://via.placeholder.com/400' },
          { title: 'Card Title 4', description: 'Description for the fourth card.', imgSrc: 'https://via.placeholder.com/400' },
          { title: 'Card Title 5', description: 'Fifth card description.', imgSrc: 'https://via.placeholder.com/400' },
        ],
        dialog: false,  // لتحديد ما إذا كانت نافذة الحوار مفتوحة أم لا
        form: {
          title: '',
          description: '',
          imgSrc: ''
        },
        isEditing: false,  // لتحديد إذا كنا في وضع تعديل أو إضافة
        editingIndex: -1,  // لتحديد الكارد الذي يتم تعديله
      };
    },
    methods: {
      // فتح نافذة الحوار لإضافة كارد جديد
      openDialog() {
        this.resetForm();
        this.isEditing = false;
        this.dialog = true;
      },
  
      // فتح نافذة الحوار لتعديل كارد
      editItem(index) {
        this.form = { ...this.items[index] };  // تحميل بيانات الكارد في النموذج
        this.isEditing = true;
        this.editingIndex = index;
        this.dialog = true;
      },
  
      // حفظ الكارد (إضافة أو تعديل)
      saveItem() {
        if (this.isEditing) {
          // تعديل الكارد
          this.items[this.editingIndex] = { ...this.form };
        } else {
          // إضافة كارد جديد
          this.items.push({ ...this.form });
        }
        this.closeDialog();
      },
  
      // إغلاق نافذة الحوار
      closeDialog() {
        this.dialog = false;
      },
  
      // دالة لحذف الكارد
      deleteItem(index) {
        this.items.splice(index, 1);  // حذف الكارد بناءً على الفهرس
      },
  
      // إعادة تعيين البيانات في النموذج
      resetForm() {
        this.form = {
          title: '',
          description: '',
          imgSrc: ''
        };
      }
    }
  };
  </script>
  
  <style scoped>
  /* يمكنك إضافة تنسيقات خاصة هنا إذا كنت ترغب */
  </style>
  