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
import { ref } from "vue";
import { useRouter } from "vue-router";
import RegisterBox from "@/components/RegisterBox.vue";

export default {
  components: {
    RegisterBox,
  },
  setup() {
    const router = useRouter();
    const username = ref("");
    const password = ref("");
    const showregisterBox = ref(false);

    const submitLogin = async () => {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();

        console.debug("Success:", data);

        localStorage.setItem("token", data.token);

        router.push(data.redirectUrl);
      } catch (error) {
        console.error("Error:", error);
        alert("Login failed. Please try again.");
      }
    };

    const createNewAccount = () => {
      showregisterBox.value = true;
    };

    return {
      username,
      password,
      showregisterBox,
      submitLogin,
      createNewAccount,
    };
  },
};
</script>
