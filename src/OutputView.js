import { Console } from '@woowacourse/mission-utils';
import {
  amountBeforeDiscount,
  isServiceMenu,
  dDayDiscount,
  weekdayDiscount,
  weekendDiscount,
  specialDiscount,
} from './Menu.js';
import { MESSAGE } from './constants/Message.js';

const OutputView = {
  printMenu(order) {
    Console.print(MESSAGE.order);
    for (const [menu, count] of Object.entries(order)) {
      Console.print(`${menu} ${count}개`);
    }
  },

  printAmountBeforeDiscount(menu) {
    const amount = amountBeforeDiscount(menu);
    const formattedAmount = amount.toLocaleString();
    Console.print(MESSAGE.amount);
    Console.print(`${formattedAmount}원`);
    return amount;
  },

  printServiceMenu(amount) {
    Console.print(MESSAGE.service);
    if (isServiceMenu(amount)) {
      Console.print('샴페인 1개');
    } else {
      Console.print(MESSAGE.none);
    }
  },

  printBenefitList(date, order, amount) {
    Console.print(MESSAGE.benefit);
    const dDayDiscountAmount = dDayDiscount(date);
    if (dDayDiscountAmount > 0) {
      Console.print(
        `크리스마스 디데이 할인: ${(-dDayDiscountAmount).toLocaleString()}원`
      );
    }
    const weekdayDiscountAmount = weekdayDiscount(date, order);
    if (weekdayDiscountAmount > 0) {
      Console.print(
        `평일 할인: ${(-weekdayDiscountAmount).toLocaleString()}원`
      );
    }
    const weekendDiscountAmount = weekendDiscount(date, order);
    if (weekendDiscountAmount > 0) {
      Console.print(
        `주말 할인: ${(-weekendDiscountAmount).toLocaleString()}원`
      );
    }
    const specialDiscountAmount = specialDiscount(date, order);
    if (specialDiscountAmount > 0) {
      Console.print(
        `특별 할인: ${(-specialDiscountAmount).toLocaleString()}원`
      );
    }
    const serviceMenu = isServiceMenu(amount);
    if (isServiceMenu(amount) === 25000) {
      Console.print(MESSAGE.serviceEvent);
    }
    const totalDiscountAmount =
      dDayDiscountAmount +
      weekdayDiscountAmount +
      weekendDiscountAmount +
      specialDiscountAmount +
      serviceMenu;
    if (totalDiscountAmount === 0) {
      Console.print(MESSAGE.none);
    }
    return totalDiscountAmount;
  },

  printBenefitAmount(totalDiscountAmount, amount) {
    Console.print(MESSAGE.benefitAmount);
    Console.print(`${(-totalDiscountAmount).toLocaleString()}원`);
    Console.print(MESSAGE.totalAmount);
    let finalAmount = amount - totalDiscountAmount;
    if (amount >= 120000) {
      finalAmount += 25000;
    }
    Console.print(`${finalAmount.toLocaleString()}원`);
  },

  printBadge(totalDiscountAmount) {
    Console.print(MESSAGE.badge);

    if (totalDiscountAmount >= 20000) {
      Console.print(MESSAGE.badgeSanta);
    } else if (totalDiscountAmount >= 10000) {
      Console.print(MESSAGE.badgeTree);
    } else if (totalDiscountAmount >= 5000) {
      Console.print(MESSAGE.badgeStar);
    } else {
      Console.print(MESSAGE.none);
    }
  },
};

export default OutputView;
