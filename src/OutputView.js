import { Console } from '@woowacourse/mission-utils';
import { amountBeforeDiscount, isServiceMenu, dDayDiscount,weekdayDiscount,weekendDiscount,specialDiscount } from './Menu.js';

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

  printBenefitList(date, order, amount) {
    Console.print('\n<혜택 내역>');
    const dDayDiscountAmount = dDayDiscount(date);
    if (dDayDiscountAmount > 0) {
      Console.print(`크리스마스 디데이 할인: ${(-dDayDiscountAmount).toLocaleString()}원`);
    }
    const weekdayDiscountAmount = weekdayDiscount(date, order);
    if (weekdayDiscountAmount > 0) {
      Console.print(`평일 할인: ${(-weekdayDiscountAmount).toLocaleString()}원`);
    }
    const weekendDiscountAmount = weekendDiscount(date, order);
    if (weekendDiscountAmount > 0) {
      Console.print(`주말 할인: ${(-weekendDiscountAmount).toLocaleString()}원`);
    }
    const specialDiscountAmount = specialDiscount(date, order);
    if (specialDiscountAmount > 0) {
      Console.print(`특별 할인: ${(-specialDiscountAmount).toLocaleString()}원`);
    }
    const serviceMenu = isServiceMenu(amount);
    if(isServiceMenu(amount)===25000) {
      Console.print(`증정 이벤트: -25,000원`);
    }
    const totalDiscountAmount = dDayDiscountAmount + weekdayDiscountAmount + weekendDiscountAmount + specialDiscountAmount + serviceMenu;
    if (totalDiscountAmount === 0) {
      Console.print('없음');
    }
    return totalDiscountAmount;

  },

  printBenefitAmount(totalDiscountAmount, amount) {
    Console.print('\n<총혜택 금액>');
    Console.print(`${(-totalDiscountAmount).toLocaleString()}원`);
    Console.print('\n<할인 후 예상 결제 금액>');
    let finalAmount = amount - totalDiscountAmount;
    if(amount>=120000){
      finalAmount+=25000;
    }
    Console.print(`${finalAmount.toLocaleString()}원`);
  },

  printBadge(totalDiscountAmount) {
    Console.print('\n<12월 이벤트 배지>');
  
    if (totalDiscountAmount >= 20000) {
      Console.print('산타');
    } else if (totalDiscountAmount >= 10000) {
      Console.print('트리');
    } else if (totalDiscountAmount >= 5000) {
      Console.print('별');
    } else {
      Console.print('배지 없음');
    }
  }
  
};

export default OutputView;
