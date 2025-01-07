<template>
  <v-dialog :model-value="show" max-width="500" @update:model-value="closeModal" aria-labelledby="dialog-title">
    <v-card>
      <v-card-title id="dialog-title" class="d-flex justify-center">
        <span class="text-h6">{{ $t('components.registerBox.registration.title') }}</span>
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
            {{
              guidelinesVisible
                ? $t('components.registerBox.registration.hideGuidelinesButton')
                : $t('components.registerBox.registration.showGuidelinesButton')
            }}
          </v-btn>

          <RegistrationGuidelines :visible="guidelinesVisible" />

          <label for="register-username">{{ $t('components.registerBox.registration.usernameLabel') }}</label>
          <v-text-field
            id="register-username"
            ref="usernameInput"
            v-model="username"
            :placeholder="$t('components.registerBox.registration.usernamePlaceholder')"
            outlined
            dense
            :error="!!usernameFeedback"
            :error-messages="usernameFeedback"
            @input="validateUsername"
          ></v-text-field>

          <label for="register-password">{{ $t('components.registerBox.registration.passwordLabel') }}</label>
          <v-text-field
            id="register-password"
            ref="passwordInput"
            v-model="password"
            :placeholder="$t('components.registerBox.registration.passwordPlaceholder')"
            type="password"
            outlined
            dense
            :error="!!passwordFeedback"
            :error-messages="passwordFeedback"
            @input="validatePassword"
          ></v-text-field>

          <v-btn type="submit" color="success" ref="submitButton" block :disabled="!formValid">{{
            $t('components.registerBox.registration.signUpButton')
          }}</v-btn>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="secondary" ref="cancelButton" block @click="closeModal">{{ $t('components.registerBox.registration.cancelButton') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, computed } from 'vue';
import RegistrationGuidelines from '@/components/RegistrationGuidelines.vue';
import { useI18n } from 'vue-i18n';

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
    const { t } = useI18n();
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
        usernameFeedback.value = t('components.registerBox.registration.usernameError.minLength');
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/check-username?username=${encodeURIComponent(username.value)}`);
        const data = await response.json();
        usernameFeedback.value = data.isAvailable ? '' : t('components.registerBox.registration.usernameError.taken');
      } catch (error) {
        usernameFeedback.value = t('components.registerBox.registration.usernameError.checkError');
        console.error('Error:', error);
      }
    };

    const validatePassword = () => {
      const passwordVal = password.value;
      if (passwordVal.length < 8) {
        passwordFeedback.value = t('components.registerBox.registration.passwordError.minLength');
        return;
      }
      if (!/[a-z]/.test(passwordVal) || !/[A-Z]/.test(passwordVal)) {
        passwordFeedback.value = t('components.registerBox.registration.passwordError.case');
        return;
      }
      if (!/\d/.test(passwordVal)) {
        passwordFeedback.value = t('components.registerBox.registration.passwordError.number');
        return;
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordVal)) {
        passwordFeedback.value = t('components.registerBox.registration.passwordError.symbol');
        return;
      }

      passwordFeedback.value = '';
    };

    const registerUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
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
          throw new Error(t('components.registerBox.registration.registrationFailed'));
        }

        const data = await response.json();
        console.debug('Success:', data);
        closeModal();
      } catch (error) {
        console.error('Error:', error);
        alert(t('components.registerBox.registration.registrationFailed'));
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
