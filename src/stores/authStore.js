import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

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
        const router = useRouter();
        router.push('/tasks');
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
        const router = useRouter();
        router.push('/tasks');
      }
      this.closeRegisterBox();
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      const router = useRouter();
      router.push('/tasks');
    },
    closeRegisterBox() {
      this.isRegisterBoxVisible = false;
    },
    toggleGuidelineText() {
      this.isGuidelineTextVisible = !this.isGuidelineTextVisible;
    }
  }
});
