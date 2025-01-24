import { useI18n } from 'vue-i18n';

export const getUserNameFeedback = async username => {
  const { t } = useI18n();
  if (username.length < 3) {
    return t('components.registerBox.registration.usernameError.minLength');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/check-username?username=${encodeURIComponent(username)}`);
    const data = await response.json();
    return data.isAvailable ? '' : t('components.registerBox.registration.usernameError.taken');
  } catch (error) {
    console.error('Error checking username:', error);
    return t('components.registerBox.registration.usernameError.checkError');
  }
};

export const getPasswordFeedback = password => {
  const { t } = useI18n();
  if (password.length < 8) {
    return t('components.registerBox.registration.passwordError.minLength');
  }
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    return t('components.registerBox.registration.passwordError.case');
  }
  if (!/\d/.test(password)) {
    return t('components.registerBox.registration.passwordError.number');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return t('components.registerBox.registration.passwordError.symbol');
  }

  return '';
};
