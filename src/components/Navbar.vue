<template>
  <v-container>
    <v-row align="center" justify="center" class="topnav">
      <v-col cols="12" sm="auto" class="d-flex flex-column flex-sm-row">
        <v-btn v-for="(link, index) in links" :key="index" :to="link.to" text router :style="{ color: buttonTextColor }" class="mx-2 my-2">
          {{ $t(link.label) }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  props: {
    buttonTextColor: {
      type: String,
      default: 'white'
    }
  },
  setup() {
    const links = [
      { label: 'components.navBar.home', to: '/' },
      { label: 'components.navBar.about', to: '/about' },
      { label: 'components.navBar.contact', to: '/contact' }
    ];

    return { links };
  }
};
</script>
