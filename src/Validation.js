export const isValidDate = (date) => {
  const dateRegex = /^(0?[1-9]|[1-2][0-9]|3[0-1])$/;
  return dateRegex.test(date);
};

const menuObject = {
  appetizer: ['양송이수프', '타파스', '시저샐러드'],
  main: ['티본스테이크', '바비큐립', '해산물파스타', '크리스마스파스타'],
  dessert: ['초코케이크', '아이스크림'],
  drink: ['제로콜라', '레드와인', '샴페인'],
};

export const isValidQuantity = (order) => {
  const allMenu = [...Object.values(menuObject).flat()];
  return Object.keys(order).every(
    (menu) => allMenu.includes(menu) && parseInt(order[menu]) >= 1
  );
};

export const isNotDrinksOnly = (order) => {
  return Object.keys(order).some((menu) => !menuObject.drink.includes(menu));
};

export const isValidTotalQuantity = (order) => {
  const totalItems = Object.values(order).reduce(
    (total, count) => total + parseInt(count),
    0
  );
  return totalItems <= 20;
};

export const validateOrder = (order) => {
  return (
    isValidQuantity(order) &&
    isNotDrinksOnly(order) &&
    isValidTotalQuantity(order)
  );
};
