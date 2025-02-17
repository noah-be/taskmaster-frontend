<template>
  <v-container class="py-4">
    <v-card class="pa-4" outlined>
      <v-card-text>
        <v-form @submit.prevent="submitLogin">
          <label for="username" class="v-label">{{ $t('components.loginForm.usernameLabel') }}</label>
          <v-text-field
            id="login-username"
            ref="loginUsername"
            v-model="username"
            :placeholder="$t('components.loginForm.usernamePlaceholder')"
            autocomplete="username"
            outlined
            dense
          ></v-text-field>

          <label for="password" class="v-label">{{ $t('components.loginForm.passwordLabel') }}</label>
          <v-text-field
            id="login-password"
            ref="loginPassword"
            v-model="password"
            :placeholder="$t('components.loginForm.passwordPlaceholder')"
            type="password"
            autocomplete="current-password"
            outlined
            dense
          ></v-text-field>

          <v-btn ref="loginBtn" class="mt-4" color="primary" block type="submit">{{ $t('components.loginForm.loginButton') }}</v-btn>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn ref="createAccountBtn" color="secondary" block class="mt-2" @click.prevent="authStore.isRegisterBoxVisible = true">{{
          $t('components.loginForm.createAccountButton')
        }}</v-btn>
      </v-card-actions>
    </v-card>

    <v-container v-if="authStore.isRegisterBoxVisible">
      <RegisterBox />
    </v-container>

    <v-snackbar v-model="showSnackbar" :timeout="5000" color="error" top>
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="showSnackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import RegisterBox from '@/components/RegisterBox.vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();
const authStore = useAuthStore();

const showSnackbar = ref(false);
const errorMessage = ref('');
const username = ref('');
const password = ref('');

watch(
  () => authStore.error,
  newError => {
    if (newError) {
      errorMessage.value = newError;
      showSnackbar.value = true;
      authStore.clearError();
    }
  },
  { immediate: true }
);

const submitLogin = async () => {
  await authStore.login(username.value, password.value, t);
  if (authStore.user) router.push('/tasks');
};
</script>
