<template>
  <v-container v-show="visible" aria-hidden="!visible">
    <v-card class="pa-4" elevation="2">
      <v-card-title class="text-h6">Registration Guidelines</v-card-title>
      <v-card-text>
        <ul class="custom-list">
          <li>
            <strong>Username:</strong>
            <ul>
              <li>Must be unique and not already in use</li>
              <li>At least 3 characters long</li>
            </ul>
          </li>

          <li>
            <strong>Password:</strong>
            <ul>
              <li>At least 8 characters long</li>
              <li>Include a mix of upper and lower case letters</li>
              <li>Include at least one number and one special symbol (e.g., !, @, #)</li>
              <li>Avoid using easily guessable information like your name or birthday</li>
            </ul>
          </li>
        </ul>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style scoped>
.custom-list {
  list-style-type: disc;
  margin-left: 20px;
}

.custom-list ul {
  list-style-type: circle;
  margin-left: 20px;
}
</style>
