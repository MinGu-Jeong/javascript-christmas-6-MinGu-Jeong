export const isValidDate = (date) => {
  const dateRegex = /^(0?[1-9]|[1-2][0-9]|3[0-1])$/;
  return dateRegex.test(date);
};
