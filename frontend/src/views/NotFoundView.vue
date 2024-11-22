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

<style lang="scss">
#home-btn {
  @extend %button-style;
  background-color: #198214;
  width: 100%;

  &:hover {
    background-color: #145a0d;
  }

  &:active {
    background-color: #0f3d09;
  }
}
</style>
