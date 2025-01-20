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

        <v-card title="Edit Statistics" class="bg-white">
          <v-form v-model="vaild">
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="tempValues.projevtComplate"
                    :rules="[required, numeric]"
                    label="Completed projects"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="tempValues.projectStatic"
                    :rules="[required, numeric]"
                    label="Installed equipment"
                    
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="tempValues.resantl"
                    :rules="[required, numeric]"
                    label="Investments"
                    
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-card-actions class="justify-end">
            <v-btn color="black" text @click="cancelDialog">Cancel</v-btn>
            <v-btn color="white" class="bg-blue-darken-1" text @click="saveChanges">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
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
        <p class=" text-sm">Installed equipment</p>
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
const vaild = ref(false)
const dialog = ref(false);
const projevtComplate = ref(22);
const projectStatic = ref(23);
const resantl = ref(24);

const tempValues = ref({
  projevtComplate: projevtComplate.value,
  projectStatic: projectStatic.value,
  resantl: resantl.value,
});
const required = (value) => !!value || "This field is required";
const numeric = (value) => {
  return /^[0-9]+(\.[0-9]+)?$/.test(value) || "Please enter a valid number";
};

const cancelDialog = () => {
  dialog.value = false;
};

const saveChanges = () => {
  if (vaild.value) {
    projevtComplate.value = tempValues.value.projevtComplate;
    projectStatic.value = tempValues.value.projectStatic;
    resantl.value = tempValues.value.resantl;
    dialog.value = false;
  } else {
    console.log("Form is invalid");
  }
};
</script>
