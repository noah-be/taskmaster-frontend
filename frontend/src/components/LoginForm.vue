<template>
  <form id="login-form" @submit.prevent="submitLogin">
    <RegisterBox v-if="showregisterBox" @close="showregisterBox = false" />

    <h2>Login</h2>
    <label for="login-username">Username</label>
    <input
      type="text"
      id="login-username"
      v-model="username"
      placeholder="Username"
      autocomplete="username"
    />

    <label for="login-password">Password</label>
    <input
      type="password"
      id="login-password"
      v-model="password"
      placeholder="Password"
      autocomplete="current-password"
    />

    <button id="login-btn" type="submit">Log In</button>
    <hr />
    <button
      id="create-new-account-btn"
      class="create-new-account-btn"
      @click.prevent="createNewAccount"
    >
      Create new account
    </button>
  </form>
</template>

<script>
import RegisterBox from "@/components/RegisterBox.vue";
export default {
  components: {
    RegisterBox,
  },
  data() {
    return {
      username: "",
      password: "",
      showregisterBox: false,
    };
  },
  methods: {
    submitLogin() {
      // TODO: Handle login
    },
    createNewAccount() {
      this.showregisterBox = true;
    },
  },
};
</script>
