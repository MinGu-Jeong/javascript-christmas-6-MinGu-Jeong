import { Console } from '@woowacourse/mission-utils';
import { amountBeforeDiscount, isServiceMenu, dDayDiscount,weekdayDiscount } from './Menu.js';

const OutputView = {
  printMenu(order) {
    Console.print('<주문 메뉴>');
    for (const [menu, count] of Object.entries(order)) {
      Console.print(`${menu} ${count}개`);
    }
  },

  printAmountBeforeDiscount(menu) {
    const amount = amountBeforeDiscount(menu);
    const formattedAmount = amount.toLocaleString();
    Console.print('\n<할인 전 총주문 금액>');
    Console.print(`${formattedAmount}원`);
    return amount;
  },

  printServiceMenu(amount) {
    Console.print('\n<증정 메뉴>');
    if (isServiceMenu(amount)) {
      Console.print('샴페인 1개');
    } else {
      Console.print('없음');
    }
  },

  printBenefitList(date, order) {
    Console.print('\n<혜택 내역>');
    const dDayDiscountAmount = dDayDiscount(date);
    if (dDayDiscountAmount > 0) {
      Console.print(`크리스마스 디데이 할인: ${(-dDayDiscountAmount).toLocaleString()}원`);
    }
    const weekdayDiscountAmount = weekdayDiscount(date, order);
    if (weekdayDiscountAmount > 0) {
      Console.print(`평일 할인: ${(-weekdayDiscountAmount).toLocaleString()}원`);
    }
    if (dDayDiscountAmount <= 0 && weekdayDiscountAmount <= 0) {
      Console.print('없음');
    }
  },  
};

export default OutputView;
