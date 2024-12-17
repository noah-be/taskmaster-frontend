<template>
  <v-container>
    <v-row align="center" justify="center" class="topnav">
      <v-col cols="12" sm="auto" class="d-flex flex-column flex-sm-row">
        <v-btn v-for="(link, index) in links" :key="index" :to="link.to" text router class="mx-2 my-2 text-white">
          {{ link.label }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const { t } = useI18n();

    const links = [
      { label: t('components.navBar.home'), to: '/' },
      { label: t('components.navBar.about'), to: '/about' },
      { label: t('components.navBar.contact'), to: '/contact' }
    ];

    return { links };
  }
};
</script>

<style scoped>
.topnav .v-btn {
  margin: 0.5rem;
}
</style>
