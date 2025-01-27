import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
    isRegisterBoxVisible: false,
    isGuidelineTextVisible: false
  }),
  getters: {
    isAuthenticated: state => !!state.token
  },
  actions: {
    async login(username, password) {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem('token', data.token);
      }
    },
    async register(username, password) {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem('token', data.token);
      }
      this.closeRegisterBox();
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
    },
    closeRegisterBox() {
      this.isRegisterBoxVisible = false;
    },
    toggleGuidelineVisibility() {
      this.isGuidelineTextVisible = !this.isGuidelineTextVisible;
    }
  }
});
