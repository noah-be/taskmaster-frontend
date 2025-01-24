<script setup>
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();
const route = useRoute();

function goHome() {
  router.push('/');
}

onMounted(() => {
  plausible('404', { props: { path: route.path } });
});
</script>

<template>
  <v-container class="text-center py-10">
    <v-img src="/images/404_cat.jpeg" :alt="$t('altText.notFoundCat')" max-width="400px" class="mx-auto rounded-xl" />

    <v-btn ref="homeBtn" class="mt-6" color="success" block large @click="goHome">
      {{ $t('views.notFound.homeButtonLabel') }}
    </v-btn>
  </v-container>
</template>
