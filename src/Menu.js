export const separateMenuAndCount = (input) => {
  const menuArray = input.replace(/, /g, ',').split(',');
  const menuAndCount = menuArray.reduce((acc, cur) => {
    const [menu, count] = cur.split('-');
    acc[menu.trim()] = count.trim();
    return acc;
  }, {});
  return menuAndCount;
};

const mainMenu = {
  '티본스테이크': 55000,
  '바비큐립': 54000,
  '해산물파스타': 35000,
  '크리스마스파스타': 25000
};

const dessertMenu = {
  '초코케이크': 15000,
  '아이스크림': 5000
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
      totalAmount += price * Number(count);
    }
  }

  return totalAmount;
};

export const isServiceMenu = (totalAmount) => {
  if (totalAmount >= 120000) {
    return 25000;
  }
  else{
    return 0;
  }
};

export const dDayDiscount = (date) => {
  const day = Number(date);
  if (day >= 1 && day <= 25) {
    const discountAmount = 1000 + 100 * (day - 1);
    return discountAmount;
  } else {
    return 0;
  }
};

export const weekdayDiscount = (date, order) => {
  const day = Number(date);
  const dayOfWeek = (day + 4) % 7;

  if (dayOfWeek >= 0 && dayOfWeek <= 4) {
    let dessertCount = 0;
    for (const [menu, count] of Object.entries(order)) {
      if (dessertMenu[menu]) {
        dessertCount += Number(count);
      }
    }
    return dessertCount * 2023;
  } else {
    return 0;
  }
};

export const weekendDiscount = (date, order) => {
  const day = Number(date);
  const dayOfWeek = (day + 4) % 7;
  if (dayOfWeek === 5 || dayOfWeek === 6) {
    let mainCount = 0;
    for (const [menu, count] of Object.entries(order)) {
      if (mainMenu[menu]) {
        mainCount += Number(count);
      }
    }
    return mainCount * 2023;
  } else {
    return 0;
  }
};

export const specialDiscount = (date) => {
  const specialDays = [3, 10, 17, 24, 25, 31];
  const day = Number(date);

  if (specialDays.includes(day)) {
    return 1000;
  } else {
    return 0;
  }
};


export const totalDiscount = (date) => {
};