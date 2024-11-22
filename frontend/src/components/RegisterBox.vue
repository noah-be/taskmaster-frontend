<template>
  <div
    id="register-box"
    class="modal"
    aria-labelledby="register-modal-title"
    role="dialog"
  >
    <div class="modal-content">
      <span
        class="close"
        role="button"
        tabindex="0"
        aria-label="Close"
        @click="closeModal"
        >&times;</span
      >
      <h2 id="register-modal-title">Create new account</h2>
      <form id="register-form">
        <button
          type="button"
          id="toggle-guidelines-btn"
          :aria-expanded="guidelinesVisible"
          aria-controls="registration-guidelines"
          @click="toggleGuidelines"
        >
          {{
            guidelinesVisible
              ? "Hide Registration Guidelines"
              : "Show Registration Guidelines"
          }}
        </button>

        <RegistrationGuidelines :visible="guidelinesVisible" />

        <label for="register-username">Username</label>
        <input type="text" id="register-username" v-model="username" />
        <label for="register-password">Password</label>
        <input type="password" id="register-password" v-model="password" />
        <button :disabled="!formValid">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
import RegistrationGuidelines from "@/components/RegistrationGuidelines.vue";

export default {
  components: {
    RegistrationGuidelines,
  },
  data() {
    return {
      guidelinesVisible: false,
      username: "",
      password: "",
    };
  },
  computed: {
    formValid() {
      return this.username.length >= 3 && this.password.length >= 8;
    },
  },
  methods: {
    toggleGuidelines() {
      this.guidelinesVisible = !this.guidelinesVisible;
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
