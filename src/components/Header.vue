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
          <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props">
                <v-img src="/images/profile-user.png" :alt="$t('altText.profileUser')" width="40" height="40" cover class="rounded-circle" />
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title>{{ $t('components.header.menu.logout') }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
