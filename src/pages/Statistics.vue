<template>
    <div>
        <v-toolbar class=" pl-4">
            <v-dialog max-width="500">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn
                    v-bind="activatorProps"
                    color="blue-darken-1"
                    text="Open Dialog"
                    variant="flat"
                    ></v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                    <v-card title="edit">
                        <v-form v-model="valid">
                            <v-container>
                            <v-row>
                                <v-col
                                cols="12"
                                md="4"
                                >
                                <v-text-field
                                    v-model="projevtComplate"
                                    :counter="10"                                    
                                    label="num1"
                                    required
                                ></v-text-field>
                                </v-col>

                                <v-col
                                cols="12"
                                md="4"
                                >
                                <v-text-field
                                    v-model="projectStatic"
                                    :counter="10"                                    
                                    label="num2"
                                    required
                                ></v-text-field>
                                </v-col>

                                <v-col
                                cols="12"
                                md="4"
                                >
                                <v-text-field
                                    v-model="resantl"
                                    label="num3"
                                    required
                                ></v-text-field>
                                </v-col>
                            </v-row>
                            </v-container>
                        </v-form>
                    </v-card>
                </template>
            </v-dialog>
        </v-toolbar>
    </div>
    <div class="mt-4 flex flex-wrap justify-between gap-4">
    <div class="flex-grow min-w-[250px] min-h-[200px] bg-white flex flex-col justify-center items-center">
        <span class=" text-4xl">{{projevtComplate}}</span>
        <p class="text-2xl">hello</p>
    </div>
    <div class="flex-grow min-w-[250px] min-h-[200px] bg-white flex flex-col justify-center items-center">
        <span class=" text-4xl">{{ projectStatic }}</span>
        <p class="text-2xl">hello</p>
    </div>
    <div class="flex-grow min-w-[250px] min-h-[200px] bg-white flex flex-col justify-center items-center">
        <span class=" text-4xl">{{ resantl }}</span>
        <p class="text-2xl">hello</p>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';

const valid = ref(false);
const projevtComplate = ref(22);
const projectStatic = ref(23);
const resantl = ref(24);
;</script>