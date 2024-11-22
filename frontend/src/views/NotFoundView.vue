<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goHome() {
  router.push("/");
}
</script>

<template>
  <main>
    <img
      id="cat-404"
      src="/images/404_cat.jpeg"
      alt="A sad looking cat and the white text 404 not found."
    />
    <button id="home-btn" @click="goHome">Bring Me Home</button>
  </main>
</template>
