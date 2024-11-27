<script>
export default {
  data() {
    return {
      links: [
        { label: "Home", to: "/" },
        { label: "About", to: "/about" },
        { label: "Contact", to: "/contact" },
      ],
    };
  },
};
</script>

<template>
  <v-row align="center" justify="center">
    <v-btn
      v-for="(link, index) in links"
      :key="index"
      :to="link.to"
      text
      router
      class="mx-2 text-white"
    >
      {{ link.label }}
    </v-btn>
  </v-row>
</template>
