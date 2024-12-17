<script setup>
import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <v-app-bar app dense color="primary" dark>
    <v-container>
      <v-row align="center" justify="space-between">
        <v-col cols="auto">
          <h1 class="text-h5 text-white">{{ $t('components.header.title') }}</h1>
        </v-col>

        <v-col cols="auto">
          <Navbar />
        </v-col>

        <v-col cols="auto">
          <v-btn icon>
            <v-img src="/images/profile-user.png" alt="User Profile" width="40" height="40" cover class="rounded-circle" />
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
