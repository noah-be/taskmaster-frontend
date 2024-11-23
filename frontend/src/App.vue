<script setup>
import "./assets/scss/main.scss";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>
