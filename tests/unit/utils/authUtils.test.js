import { getUserNameFeedback, getPasswordFeedback } from '@/utils/authUtils';

describe('getUserNameFeedback', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should return the minLength error when username is too short', async () => {
    const result = await getUserNameFeedback('ab');
    expect(result).toBe('components.registerBox.registration.usernameError.minLength');
  });

  it('should return the username taken error when username is unavailable', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ isAvailable: false })
        })
      )
    );

    const result = await getUserNameFeedback('validUsername');
    expect(result).toBe('components.registerBox.registration.usernameError.taken');
  });

  it('should return an empty string when username is available', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ isAvailable: true })
        })
      )
    );

    const result = await getUserNameFeedback('validUsername');
    expect(result).toBe('');
  });

  it('should return the checkError translation key on fetch error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('Network error')))
    );

    const result = await getUserNameFeedback('validUsername');
    expect(result).toBe('components.registerBox.registration.usernameError.checkError');
  });
});

describe('getPasswordFeedback', () => {
  it('should return the minLength error when password is too short', () => {
    const result = getPasswordFeedback('short');
    expect(result).toBe('components.registerBox.registration.passwordError.minLength');
  });

  it('should return the case error when password lacks uppercase or lowercase characters', () => {
    let result = getPasswordFeedback('ALLUPPERCASE1!');
    expect(result).toBe('components.registerBox.registration.passwordError.case');

    result = getPasswordFeedback('alllowercase1!');
    expect(result).toBe('components.registerBox.registration.passwordError.case');
  });

  it('should return the number error when password lacks a numeric character', () => {
    const result = getPasswordFeedback('Password!');
    expect(result).toBe('components.registerBox.registration.passwordError.number');
  });

  it('should return the symbol error when password lacks a special symbol', () => {
    const result = getPasswordFeedback('Password1');
    expect(result).toBe('components.registerBox.registration.passwordError.symbol');
  });

  it('should return an empty string when the password meets all criteria', () => {
    const result = getPasswordFeedback('ValidPassword1!');
    expect(result).toBe('');
  });
});
