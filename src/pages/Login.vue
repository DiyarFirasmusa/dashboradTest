<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6">
        <v-card class="elevation-3">
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSubmit">
              <v-text-field
                v-model="name"
                label="name"
                type="name"
                required
                :rules="nameRules"
              />
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
                :rules="emailRules"
              />
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
                :rules="passwordRules"
              />

              <v-btn color="primary" type="submit">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();

const name = ref('');
const email = ref('');
const password = ref('');

const nameRules = [
  (v) => !!v || 'Name is required',
];

const emailRules = [
  (v) => !!v || 'E-mail is required',
  (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
];

const passwordRules = [
  (v) => !!v || 'Password is required',
  (v) => (v && v.length >= 8) || 'Password must be at least 8 characters',
];

const handleSubmit = async () => {
  try {
    const response = await axios.post('http://ao8kgskw4wcs0ck48sgwg440.194.163.168.91.sslip.io/api/Autors/signUp', {
      name: name.value,
      email: email.value,
      password: password.value
    });

    // Store token in cookies
    cookies.set('authToken', response.data.token, '1d'); // Set token with 1 day expiration

    console.log('Login successful:', response.data);
    // Redirect to home page after successful login
    // Assuming you have a router instance

  } catch (error) {
    console.error('Login failed:', error);
    // Handle login errors (e.g., display an error message)
  }
};
</script>

<style scoped>
</style>
