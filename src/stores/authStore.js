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
    async login(username, password) {
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
        this.error = error.message;
      }
    },
    async register(username, password) {
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
        this.error = error.message;
      } finally {
        this.closeRegisterBox();
      }
    },

    logout() {
      try {
        localStorage.removeItem('token');
        this.token = null;
        this.user = null;
      } catch (error) {
        console.error('Logout failed:', error.message);
        this.error = 'Error during logout.';
      }
    },

    closeRegisterBox() {
      this.isRegisterBoxVisible = false;
    },
    toggleGuidelineVisibility() {
      this.isGuidelineTextVisible = !this.isGuidelineTextVisible;
    }
  }
});

// TODO: Add user notification of errors. Maybe a toast or a modal.
