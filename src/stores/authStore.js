import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
    isRegisterBoxVisible: false,
    isGuidelineTextVisible: false,
    error: null
  }),
  getters: {
    isAuthenticated: state => !!state.token
  },
  actions: {
    async login(username, password, t) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
          throw new Error('Login failed! ' + (await response.text()));
        }

        const data = await response.json();
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem('token', data.token);
      } catch (error) {
        console.error('Login error:', error.message);
        this.error = t('stores.authStore.loginError');
      }
    },
    async register(username, password, t) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
          throw new Error('Registration failed! ' + (await response.text()));
        }

        const data = await response.json();
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem('token', data.token);
      } catch (error) {
        console.error('Registration error:', error.message);
        this.error = t('stores.authStore.registerError');
      } finally {
        this.closeRegisterBox();
      }
    },

    logout(t) {
      try {
        localStorage.removeItem('token');
        this.token = null;
        this.user = null;
      } catch (error) {
        console.error('Logout failed:', error.message);
        this.error = t('stores.authStore.logoutError');
      }
    },

    closeRegisterBox() {
      this.isRegisterBoxVisible = false;
    },
    toggleGuidelineVisibility() {
      this.isGuidelineTextVisible = !this.isGuidelineTextVisible;
    },
    clearError() {
      this.error = null;
    }
  }
});
