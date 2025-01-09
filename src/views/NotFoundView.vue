<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goHome() {
  router.push('/');
}
</script>

<template>
  <v-container class="text-center py-10">
    <v-img src="/images/404_cat.jpeg" :alt="$t('altText.notFoundCat')" max-width="400px" class="mx-auto rounded-xl" />

    <v-btn class="mt-6" color="success" block large @click="goHome">
      {{ $t('views.notFound.homeButtonLabel') }}
    </v-btn>
  </v-container>
</template>

<script>
export default {
  mounted() {
    plausible('404', { props: { path: this.$route.path } });
  }
};
</script>
