export const formatDateByLocale = (dueDate, locale) => {
  // TODO: Add error handling for invalid date
  // TODO: Add dateUtils tests
  return new Date(dueDate).toLocaleDateString(locale);
};
