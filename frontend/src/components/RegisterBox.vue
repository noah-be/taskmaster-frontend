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
      <form id="register-form" @submit.prevent="registerUser">
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
        <input
          type="text"
          id="register-username"
          v-model="username"
          @input="validateUsername"
        />
        <div id="username-feedback" :style="{ color: feedbackColor }">
          {{ usernameFeedback }}
        </div>

        <label for="register-password">Password</label>
        <input
          type="password"
          id="register-password"
          v-model="password"
          @input="validatePassword"
        />
        <div id="password-feedback" :style="{ color: passwordFeedbackColor }">
          {{ passwordFeedback }}
        </div>

        <button type="submit" :disabled="!formValid">Sign Up</button>
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
      usernameFeedback: "",
      feedbackColor: "black",
      passwordFeedback: "",
      passwordFeedbackColor: "black",
    };
  },
  computed: {
    formValid() {
      return (
        this.username.length >= 3 &&
        this.password.length >= 8 &&
        this.passwordFeedback === ""
      );
    },
  },
  methods: {
    async validateUsername() {
      if (this.username.length < 3) {
        this.usernameFeedback = "Username must be at least 3 characters";
        this.feedbackColor = "red";
        return;
      }

      try {
        const response = await fetch(
          `/api/auth/check-username?username=${encodeURIComponent(this.username)}`,
        );
        const data = await response.json();
        if (data.isAvailable) {
          this.usernameFeedback = "Username is available";
          this.feedbackColor = "green";
        } else {
          this.usernameFeedback = "Username is already taken";
          this.feedbackColor = "red";
        }
      } catch (error) {
        console.error("Error:", error);
        this.usernameFeedback = "Error checking username";
        this.feedbackColor = "red";
      }
    },
    validatePassword() {
      const password = this.password;

      if (password.length < 8) {
        this.passwordFeedback = "Password must be at least 8 characters long";
        this.passwordFeedbackColor = "red";
        return;
      }
      if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
        this.passwordFeedback =
          "Password must include both upper and lower case letters";
        this.passwordFeedbackColor = "red";
        return;
      }
      if (!/\d/.test(password)) {
        this.passwordFeedback = "Password must include at least one number";
        this.passwordFeedbackColor = "red";
        return;
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        this.passwordFeedback =
          "Password must include at least one special symbol like !, @, #, etc.";
        this.passwordFeedbackColor = "red";
        return;
      }

      this.passwordFeedback = "";
      this.passwordFeedbackColor = "green";
    },
    async registerUser() {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to register user");
        }

        const data = await response.json();
        console.debug("Success:", data);
        this.$router.push("/tasks");
      } catch (error) {
        console.error("Error:", error);
        alert("Registration failed. Please try again.");
      }
    },
    toggleGuidelines() {
      this.guidelinesVisible = !this.guidelinesVisible;
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
