<template>
    <v-app-bar :elevation="0"  >
        <v-app-bar-title>
            <div class=" flex items-center gap-3">
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      class="custom-btn">
                      <v-avatar color="surface-variant" class="custom-avatar"></v-avatar>
                    </v-btn>
                  </template>
                  <v-list class="custom-list">
                    <v-list-item
                      v-for="(item, index) in items"
                      :key="index"
                      :value="index"
                    >
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
               </v-menu>
            </div>
        </v-app-bar-title>
    </v-app-bar>
</template>

<script setup>
    const items = [
      { title: 'Profile' },
      { title: 'Settings' },
      { title: 'Log Out' },
    ]
</script>

<style>
.custom-btn {
  font-size: 18px !important;
}

.custom-avatar {
  border: 2px solid #1976D2 !important;
  width: 35px !important;
  height: 35px !important;
}
.custom-list {
  margin-top: 0.5rem !important;
}
</style>