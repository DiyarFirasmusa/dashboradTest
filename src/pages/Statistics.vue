<template>
    <div>
      <v-toolbar class="pl-2 bg-grey-lighten-2 custom-toolbar">
        <v-dialog max-width="500" v-model="dialog">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              color="blue-darken-1"
              text="Edit Statistics"
              variant="flat"
            ></v-btn>
          </template>
  
          <template v-slot:default="{ isActive }">
            <v-card title="Edit Statistics" class="bg-white">
              <v-form v-model="valid">
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="tempValues.projevtComplate"
                        :counter="10"
                        label="Completed projects"
                        required
                      ></v-text-field>
                    </v-col>
  
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="tempValues.projectStatic"
                        :counter="10"
                        label="installed equipment"
                        required
                      ></v-text-field>
                    </v-col>
  
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="tempValues.resantl"
                        label="Investments"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <v-card-actions class="justify-end">
                <v-btn color="black" class="bg-grey-lighten-2" text @click="cancelDialog">Cancel</v-btn>
                <v-btn color="white" class="bg-blue-darken-1" text @click="saveChanges">Save</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-toolbar>
  
      <div class="mt-4 flex flex-wrap justify-between gap-4">
        <div
          class="flex-grow min-w-[250px] min-h-[120px] bg-grey-lighten-2 flex flex-col justify-center items-center"
        >
          <span class="text-3xl text-blue">{{ projevtComplate }}</span>
          <p class=" text-sm">Completed projects</p>
        </div>
        <div
          class="flex-grow min-w-[250px] min-h-[120px] bg-grey-lighten-2 flex flex-col justify-center items-center"
        >
          <span class="text-3xl text-blue">{{ projectStatic }}</span>
          <p class=" text-sm">installed equipment</p>
        </div>
        <div
          class="flex-grow min-w-[250px] min-h-[120px] bg-grey-lighten-2 flex flex-col justify-center items-center"
        >
          <span class="text-3xl text-blue">{{ resantl }}</span>
          <p class=" text-sm">Investments</p>
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

  <style>
    </style>
  