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
  <v-container>
    <v-row
      align="center"
      justify="center"
      class="topnav"
    >
      <v-col
        cols="12"
        sm="auto"
        class="d-flex flex-column flex-sm-row"
      >
        <v-btn
          v-for="(link, index) in links"
          :key="index"
          :to="link.to"
          text
          router
          class="mx-2 my-2 text-white"
        >
          {{ link.label }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
