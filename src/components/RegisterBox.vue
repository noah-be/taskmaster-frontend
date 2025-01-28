<template>
  <v-dialog v-model="authStore.isRegisterBoxVisible" max-width="500" @update:model-value="authStore.closeRegisterBox" aria-labelledby="dialog-title">
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
            @click="authStore.toggleGuidelineVisibility"
            :aria-expanded="authStore.isGuidelineTextVisible"
            aria-controls="registration-guidelines"
          >
            {{ guidelinesButtonText }}
          </v-btn>

          <RegistrationGuidelines :visible="authStore.isGuidelineTextVisible" />

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
        <v-btn color="secondary" ref="cancelButton" block @click="authStore.closeRegisterBox">{{
          $t('components.registerBox.registration.cancelButton')
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import RegistrationGuidelines from '@/components/RegistrationGuidelines.vue';
import { getUserNameFeedback, getPasswordFeedback } from '@/utils/authUtils';
import { useAuthStore } from '@/stores/authStore';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
const { t } = useI18n();
const authStore = useAuthStore();
const username = ref('');
const password = ref('');
const usernameFeedback = ref('');
const passwordFeedback = ref('');

const validateUsername = async () => {
  usernameFeedback.value = await getUserNameFeedback(t, username.value);
};

const validatePassword = async () => {
  passwordFeedback.value = getPasswordFeedback(t, password.value);
};

watch(username, validateUsername);
watch(password, validatePassword);

const formValid = computed(() => {
  return username.value.length >= 3 && password.value.length >= 8 && !usernameFeedback.value && !passwordFeedback.value;
});

const registerUser = async () => {
  if (formValid.value) {
    await authStore.register(username.value, password.value);
    router.push('/tasks');
  }
};

const guidelinesButtonText = computed(() => {
  return authStore.isGuidelineTextVisible
    ? t('components.registerBox.registration.hideGuidelinesButton')
    : t('components.registerBox.registration.showGuidelinesButton');
});
</script>
