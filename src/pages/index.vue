<template>
    <v-row>
        <v-col cols="12" md="4">
            <TotalEarning />
        </v-col>
        <v-col cols="12" md="4">
            <TotalOrder />
        </v-col>
        <v-col cols="12" md="4">
            <TotalIncome />
        </v-col>
        <v-col cols="12" lg="8">
            <TotalGrowth />
        </v-col>
        <v-col cols="12" lg="4">
            <PopularStocks />
        </v-col>
    </v-row>

</template>

<script setup>
  import TotalEarning from '@/components/home/TotalEarning.vue';
  import TotalOrder from '@/components/home/TotalOrder.vue';
  import TotalIncome from '@/components/home/TotalIncome.vue';
  import TotalGrowth from '@/components/home/TotalGrowth.vue';
</script>
