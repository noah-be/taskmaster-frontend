import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '@/stores/authStore';

global.fetch = vi.fn();

describe('authStore', () => {
  let authStore;

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
    authStore = useAuthStore();

    global.localStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn()
    };

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('State', () => {
    it('should have an initial state', () => {
      expect(authStore.token).toBeNull();
      expect(authStore.user).toBeNull();
      expect(authStore.isRegisterBoxVisible).toBe(false);
      expect(authStore.isGuidelineTextVisible).toBe(false);
    });
  });

  describe('Getters', () => {
    describe('isAuthenticated', () => {
      it('should return true when token exists', () => {
        authStore.token = 'validToken';
        expect(authStore.isAuthenticated).toBe(true);
      });

      it('should return false when token is null', () => {
        authStore.token = null;
        expect(authStore.isAuthenticated).toBe(false);
      });
    });
  });

  describe('Actions', () => {
    describe('login', () => {
      it('should update state on successful login', async () => {
        const mockResponse = {
          token: 'testToken',
          user: { id: 1, username: 'testUser' }
        };

        fetch.mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValueOnce(mockResponse)
        });

        await authStore.login('testUser', 'password123', t);

        expect(authStore.token).toBe('testToken');
        expect(authStore.user).toEqual(mockResponse.user);
        expect(global.localStorage.setItem).toHaveBeenCalledWith('token', 'testToken');
      });

      it('should not update state on login failure', async () => {
        fetch.mockResolvedValueOnce({ ok: false });

        await authStore.login('testUser', 'password123', t);

        expect(authStore.token).toBe(null);
        expect(authStore.user).toBe(null);
        expect(global.localStorage.setItem).not.toHaveBeenCalled();
      });
    });

    describe('register', () => {
      it('should update state and close register box on successful registration', async () => {
        const mockResponse = {
          token: 'testToken',
          user: { id: 1, username: 'testUser' }
        };

        fetch.mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValueOnce(mockResponse)
        });

        await authStore.register('testUser', 'password123');

        expect(authStore.token).toBe('testToken');
        expect(authStore.user).toEqual(mockResponse.user);
        expect(global.localStorage.setItem).toHaveBeenCalledWith('token', 'testToken');
        expect(authStore.isRegisterBoxVisible).toBe(false);
      });

      it('should not update state on registration failure', async () => {
        fetch.mockResolvedValueOnce({ ok: false });

        await authStore.register('testUser', 'password123', t);

        expect(authStore.token).toBe(null);
        expect(authStore.user).toBe(null);
        expect(global.localStorage.setItem).not.toHaveBeenCalled();
        expect(authStore.isRegisterBoxVisible).toBe(false);
      });
    });

    describe('logout', () => {
      it('should reset state', () => {
        authStore.token = 'testToken';
        authStore.user = { id: 1, username: 'testUser' };
        global.localStorage.setItem('token', 'testToken');

        authStore.logout();

        expect(authStore.token).toBe(null);
        expect(authStore.user).toBe(null);
        expect(global.localStorage.removeItem).toHaveBeenCalledWith('token');
      });
    });

    describe('toggleGuidelineVisibility', () => {
      it('should toggle the value of isGuidelineTextVisible', () => {
        expect(authStore.isGuidelineTextVisible).toBe(false);

        authStore.toggleGuidelineVisibility();
        expect(authStore.isGuidelineTextVisible).toBe(true);

        authStore.toggleGuidelineVisibility();
        expect(authStore.isGuidelineTextVisible).toBe(false);
      });
    });
  });
});
