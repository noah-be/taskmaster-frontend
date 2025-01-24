<template>
  <v-container class="py-4">
    <v-card class="pa-4" outlined>
      <v-card-text>
        <v-form @submit.prevent="submitLogin">
          <label for="username" class="v-label">{{ $t('components.loginForm.usernameLabel') }}</label>
          <v-text-field
            id="username"
            v-model="username"
            :placeholder="$t('components.loginForm.usernamePlaceholder')"
            autocomplete="username"
            outlined
            dense
          ></v-text-field>

          <label for="password" class="v-label">{{ $t('components.loginForm.passwordLabel') }}</label>
          <v-text-field
            id="password"
            v-model="password"
            :placeholder="$t('components.loginForm.passwordPlaceholder')"
            type="password"
            autocomplete="current-password"
            outlined
            dense
          ></v-text-field>

          <v-btn class="mt-4" color="primary" block type="submit">{{ $t('components.loginForm.loginButton') }}</v-btn>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="secondary" block class="mt-2" @click.prevent="showregisterBox = true">{{ $t('components.loginForm.createAccountButton') }}</v-btn>
      </v-card-actions>
    </v-card>

    <RegisterBox :show="showregisterBox" @update:show="showregisterBox = $event" />
  </v-container>
</template>

<script>
import { ref } from 'vue';
import RegisterBox from '@/components/RegisterBox.vue';
import { useAuthStore } from '@/stores/authStore';

export default {
  components: {
    RegisterBox
  },
  setup() {
    const authStore = useAuthStore();
    const username = ref('');
    const password = ref('');
    const showregisterBox = ref(false);

    const submitLogin = async () => {
      await authStore.login(username.value, password.value);
    };

    return {
      username,
      password,
      showregisterBox,
      submitLogin
    };
  }
};
</script>
