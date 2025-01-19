<template>
    <v-card
      class="mx-auto text-center"
      color="white"
      max-width="600"
      dark
    >
      <v-card-text class="mt-4">
        <v-sheet color="shite">
          <v-sparkline
            :model-value="value"
            color="white"
            height="176"
            padding="24"
            stroke-linecap="round"
            smooth
          >
            <template v-slot:label="item">
              ${{ item.value }}
            </template>
          </v-sparkline>
        </v-sheet>
      </v-card-text>
    </v-card>
  </template>
  <script>
  export default {
    data: () => ({
      value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
      ],
    }),
  }
</script>