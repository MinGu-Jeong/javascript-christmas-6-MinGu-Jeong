export const separateMenuAndCount = (input) => {
  const menuArray = input.split(',');
  const menuAndCount = menuArray.reduce((acc, cur) => {
    const [menu, count] = cur.split('-');
    acc[menu] = count;
    return acc;
  }, {});
  return menuAndCount;
};

const menuPrice = {
  양송이수프: 6000,
  타파스: 5500,
  시저샐러드: 8000,
  티본스테이크: 55000,
  바비큐립: 54000,
  해산물파스타: 35000,
  크리스마스파스타: 25000,
  초코케이크: 15000,
  아이스크림: 5000,
  제로콜라: 3000,
  레드와인: 60000,
  샴페인: 25000,
};

export const amountBeforeDiscount = (order) => {
  let totalAmount = 0;
  for (const [menu, count] of Object.entries(order)) {
    const price = menuPrice[menu];
    if (price) {
      totalAmount += price * parseInt(count);
    }
  }

  return totalAmount;
};

export const isServiceMenu = (totalAmount) => {
  if (totalAmount >= 120000) {
    return true;
  }
};

export const dDayDiscount = (date) => {};
