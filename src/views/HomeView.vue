<script setup>
import LoginForm from "@/components/LoginForm.vue";
</script>

<template>
  <v-container>
    <v-row align="center" justify="center" class="home">
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-card outlined class="w-100 h-100">
          <v-card-text>
            <LoginForm />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-responsive class="w-100 h-100">
          <v-img
            src="/images/todo_list.jpg"
            alt="A table on which there are plants, paper clips, a clipboard, an alarm clock and a ballpoint pen."
            class="rounded-xl"
            contain
          />
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</template>
