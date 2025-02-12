export const formatDateByLocale = (dueDate, locale) => {
  try {
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date: ${dueDate}`);
    }

    return date.toLocaleDateString(locale);
  } catch (error) {
    console.error('Error formatting date:', error.message);
  }
};
