import { Console } from '@woowacourse/mission-utils';
import { amountBeforeDiscount, isServiceMenu } from './Menu.js';

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
};

export default OutputView;
