import { useI18n } from 'vue-i18n';

const { t } = useI18n();

export const getUserNameFeedback = async () => {
  if (username.value.length < 3) {
    usernameFeedback.value = t('components.registerBox.registration.usernameError.minLength');
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/check-username?username=${encodeURIComponent(username.value)}`);
    const data = await response.json();
    usernameFeedback.value = data.isAvailable ? '' : t('components.registerBox.registration.usernameError.taken');
  } catch (error) {
    usernameFeedback.value = t('components.registerBox.registration.usernameError.checkError');
    console.error('Error:', error);
  }
};

export const getPasswordFeedback = () => {
  const passwordVal = password.value;
  if (passwordVal.length < 8) {
    passwordFeedback.value = t('components.registerBox.registration.passwordError.minLength');
    return;
  }
  if (!/[a-z]/.test(passwordVal) || !/[A-Z]/.test(passwordVal)) {
    passwordFeedback.value = t('components.registerBox.registration.passwordError.case');
    return;
  }
  if (!/\d/.test(passwordVal)) {
    passwordFeedback.value = t('components.registerBox.registration.passwordError.number');
    return;
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordVal)) {
    passwordFeedback.value = t('components.registerBox.registration.passwordError.symbol');
    return;
  }

  passwordFeedback.value = '';
};
