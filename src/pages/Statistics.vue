<template>
    <div>
      <v-toolbar class="pl-4">
        <v-dialog max-width="500" v-model="dialog">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              color="blue-darken-1"
              text="Open Dialog"
              variant="flat"
            ></v-btn>
          </template>
  
          <template v-slot:default="{ isActive }">
            <v-card title="Edit">
              <v-form v-model="valid">
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="tempValues.projevtComplate"
                        :counter="10"
                        label="num1"
                        required
                      ></v-text-field>
                    </v-col>
  
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="tempValues.projectStatic"
                        :counter="10"
                        label="num2"
                        required
                      ></v-text-field>
                    </v-col>
  
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="tempValues.resantl"
                        label="num3"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <v-card-actions class="justify-end">
                <v-btn color="red" text @click="cancelDialog">Cancel</v-btn>
                <v-btn color="green" text @click="saveChanges">Save</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-toolbar>
  
      <div class="mt-4 flex flex-wrap justify-between gap-4">
        <div
          class="flex-grow min-w-[250px] min-h-[200px] bg-white flex flex-col justify-center items-center"
        >
          <span class="text-4xl">{{ projevtComplate }}</span>
          <p class="text-2xl">hello</p>
        </div>
        <div
          class="flex-grow min-w-[250px] min-h-[200px] bg-white flex flex-col justify-center items-center"
        >
          <span class="text-4xl">{{ projectStatic }}</span>
          <p class="text-2xl">hello</p>
        </div>
        <div
          class="flex-grow min-w-[250px] min-h-[200px] bg-white flex flex-col justify-center items-center"
        >
          <span class="text-4xl">{{ resantl }}</span>
          <p class="text-2xl">hello</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const dialog = ref(false);
  const valid = ref(false);
  
  const projevtComplate = ref(22);
  const projectStatic = ref(23);
  const resantl = ref(24);
  
  const tempValues = ref({
    projevtComplate: projevtComplate.value,
    projectStatic: projectStatic.value,
    resantl: resantl.value,
  });
  
  const cancelDialog = () => {
    dialog.value = false;
    tempValues.value = {
      projevtComplate: projevtComplate.value,
      projectStatic: projectStatic.value,
      resantl: resantl.value,
    };
  };
  
  const saveChanges = () => {
    projevtComplate.value = tempValues.value.projevtComplate;
    projectStatic.value = tempValues.value.projectStatic;
    resantl.value = tempValues.value.resantl;
  
    dialog.value = false;
    console.log("Values saved:", {
      projevtComplate: projevtComplate.value,
      projectStatic: projectStatic.value,
      resantl: resantl.value,
    });
  };
  </script>
  