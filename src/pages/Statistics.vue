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
import { ref, onMounted } from "vue";
import axios from "axios";

// API Base URL
const API_URL = "http://ao8kgskw4wcs0ck48sgwg440.194.163.168.91.sslip.io/api/Statistic";

const vaild = ref(false);
const dialog = ref(false);
const projevtComplate = ref(0);
const projectStatic = ref(0);
const resantl = ref(0);
const id = ref(null);

const tempValues = ref({
  projevtComplate: projevtComplate.value,
  projectStatic: projectStatic.value,
  resantl: resantl.value,
});

// Validation rules
const required = (value) => !!value || "This field is required";
const numeric = (value) => {
  return /^[0-9]+(\.[0-9]+)?$/.test(value) || "Please enter a valid number";
};

// Cancel dialog changes
const cancelDialog = () => {
  dialog.value = false;
};

// Fetch statistics from API
const fetchStatistics = async () => {
  try {
    const response = await axios.get(API_URL);
    if (response && response.data) {
      // Update values with API data
      id.value = response.data.id;
      projevtComplate.value = response.data.projectsFinished;
      projectStatic.value = response.data.equipmentInstalled;
      resantl.value = response.data.envestments;
      tempValues.value.projevtComplate = response.data.projectsFinished
      tempValues.value.projectStatic = response.data.equipmentInstalled
      tempValues.value.resantl = response.data.envestments
    }
  } catch (error) {
    console.error("Error fetching statistics:", error.message);
  }
};

// Save changes to API
const saveChanges = async () => {
  if (vaild.value) {
    try {
      // Use the JWT token you provided
      const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMiLCJleHAiOjE3Njg5Mjc0OTcsImlzcyI6ImhheWRlcjIwMDIxMi5jb20iLCJhdWQiOiJodHRwczovL2hheWRlcjIwMDIxMi5jb20ifQ.w6Wh1NaMT3CnODyG_O9gBKejIamLcnLeaLo20KuAWB7eztJrBmfnq8YKgEbZTP9h9_6PlWne8fc6Z_Jba_0VuA";

      if (!token) {
        console.error("No authentication token found");
        return;
      }

      // Set the Authorization header with the token
      console.log("Sending request with Authorization token...");

      const response = await axios.put(
        `${API_URL}/${id.value}`,
        {
          projectsFinished: projevtComplate.value,
          equipmentInstalled: projectStatic.value,
          envestments: resantl.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token here
          }
        }
      );

      if (response.status === 200) {
        // Successfully saved the changes, update the local state
        projevtComplate.value = tempValues.value.projevtComplate;
        projectStatic.value = tempValues.value.projectStatic;
        resantl.value = tempValues.value.resantl;
        dialog.value = false;
        console.log("Changes saved successfully!");
      } else {
        console.error("Failed to save changes:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error saving statistics:", error.message);
      if (error.response) {
        console.error("Response Status:", error.response.status);
        console.error("Response Data:", error.response.data);
      }
    }
  } else {
    console.log("Form is invalid");
  }
};



// Fetch statistics when component is mounted
onMounted(() => {
  console.log("Fetching statistics...");
  fetchStatistics();
});
// watch(tempValues, (newValues, oldValues) => {
//   console.log("Temp values changed:");
//   console.log("Old values:", oldValues.id);
//   console.log("New values:", newValues.id);
// });
</script>
