<template>
  <v-dialog :model-value="show" max-width="500" @update:model-value="closeModal">
    <v-card>
      <v-card-title class="d-flex justify-center">
        <span class="text-h6">Create New Account</span>
      </v-card-title>

      <v-card-text>
        <v-form id="register-form" ref="registerForm" @submit.prevent="registerUser" lazy-validation>
          <v-btn
            color="primary"
            ref="registrationGuidelinesButton"
            block
            class="mb-4"
            @click="toggleGuidelines"
            :aria-expanded="guidelinesVisible"
            aria-controls="registration-guidelines"
          >
            {{ guidelinesVisible ? 'Hide Registration Guidelines' : 'Show Registration Guidelines' }}
          </v-btn>

          <RegistrationGuidelines :visible="guidelinesVisible" />
          <v-text-field
            id="register-username"
            ref="usernameInput"
            v-model="username"
            label="Username"
            outlined
            dense
            :error="!!usernameFeedback"
            :error-messages="usernameFeedback"
            @input="validateUsername"
          ></v-text-field>

          <v-text-field
            id="register-password"
            ref="passwordInput"
            v-model="password"
            label="Password"
            type="password"
            outlined
            dense
            :error="!!passwordFeedback"
            :error-messages="passwordFeedback"
            @input="validatePassword"
          ></v-text-field>

          <v-btn type="submit" color="success" ref="submitButton" block :disabled="!formValid"> Sign Up </v-btn>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="secondary" ref="cancelButton" block @click="closeModal">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, computed } from 'vue';
import RegistrationGuidelines from '@/components/RegistrationGuidelines.vue';

export default {
  components: {
    RegistrationGuidelines
  },
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:show'],
  setup(props, { emit }) {
    const guidelinesVisible = ref(false);
    const username = ref('');
    const password = ref('');
    const usernameFeedback = ref('');
    const passwordFeedback = ref('');

    const formValid = computed(() => {
      return username.value.length >= 3 && password.value.length >= 8 && !usernameFeedback.value && !passwordFeedback.value;
    });

    const closeModal = () => {
      emit('update:show', false);
    };

    const toggleGuidelines = () => {
      guidelinesVisible.value = !guidelinesVisible.value;
    };

    const validateUsername = async () => {
      if (username.value.length < 3) {
        usernameFeedback.value = 'Username must be at least 3 characters';
        return;
      }

      try {
        const response = await fetch(`/api/auth/check-username?username=${encodeURIComponent(username.value)}`);
        const data = await response.json();
        usernameFeedback.value = data.isAvailable ? '' : 'Username is already taken';
      } catch (error) {
        usernameFeedback.value = 'Error checking username';
        console.error('Error:', error);
      }
    };

    const validatePassword = () => {
      const passwordVal = password.value;
      if (passwordVal.length < 8) {
        passwordFeedback.value = 'Password must be at least 8 characters long';
        return;
      }
      if (!/[a-z]/.test(passwordVal) || !/[A-Z]/.test(passwordVal)) {
        passwordFeedback.value = 'Password must include both upper and lower case letters';
        return;
      }
      if (!/\d/.test(passwordVal)) {
        passwordFeedback.value = 'Password must include at least one number';
        return;
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordVal)) {
        passwordFeedback.value = 'Password must include at least one special symbol';
        return;
      }

      passwordFeedback.value = '';
    };

    const registerUser = async () => {
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value
          })
        });

        if (!response.ok) {
          throw new Error('Failed to register user');
        }

        const data = await response.json();
        console.debug('Success:', data);
        closeModal();
      } catch (error) {
        console.error('Error:', error);
        alert('Registration failed. Please try again.');
      }
    };

    return {
      guidelinesVisible,
      username,
      password,
      usernameFeedback,
      passwordFeedback,
      formValid,
      closeModal,
      toggleGuidelines,
      validateUsername,
      validatePassword,
      registerUser
    };
  }
};
</script>
