import {
  separateMenuAndCount,
  amountBeforeDiscount,
  isServiceMenu,
  dDayDiscount,
  weekdayDiscount,
  weekendDiscount,
  specialDiscount,
} from '../src/Menu';

describe('Menu.js', () => {
  describe('separateMenuAndCount', () => {
    it('메뉴 분리와 개수 측정 테스트', () => {
      const input = '티본스테이크-1,바비큐립-2';
      const result = separateMenuAndCount(input);
      expect(result).toEqual({
        티본스테이크: '1',
        바비큐립: '2',
      });
    });
  });

  describe('amountBeforeDiscount', () => {
    it('주문 금액 테스트', () => {
      const order = {
        티본스테이크: '1',
        바비큐립: '2',
      };
      const result = amountBeforeDiscount(order);
      expect(result).toBe(55000 + 54000 * 2);
    });
  });

  describe('isServiceMenu', () => {
    it('25000원 이상 주문시 샴페인 제공 테스트', () => {
      const highAmount = 120000;
      expect(isServiceMenu(highAmount)).toBe(25000);

      const veryHighAmount = 200000;
      expect(isServiceMenu(veryHighAmount)).toBe(25000);
    });

    it('25000원 미만 주문시 미지급 테스트', () => {
      const lowAmount = 119999;
      expect(isServiceMenu(lowAmount)).toBe(0);

      const veryLowAmount = 50000;
      expect(isServiceMenu(veryLowAmount)).toBe(0);
    });
  });

  describe('dDayDiscount', () => {
    it('디데이 할인 테스트', () => {
      expect(dDayDiscount('1')).toBe(1000);
      expect(dDayDiscount('2')).toBe(1100);
      expect(dDayDiscount('3')).toBe(1200);
      expect(dDayDiscount('4')).toBe(1300);
      expect(dDayDiscount('5')).toBe(1400);
      expect(dDayDiscount('10')).toBe(1900);
      expect(dDayDiscount('15')).toBe(2400);
      expect(dDayDiscount('20')).toBe(2900);
      expect(dDayDiscount('25')).toBe(3400);
    });

    it('25일 이후로는 0원 할인', () => {
      expect(dDayDiscount('26')).toBe(0);
      expect(dDayDiscount('30')).toBe(0);
    });
  });

  describe('weekdayDiscount', () => {
    it('평일 주문 테스트', () => {
      const orderWeekday = {
        초코케이크: '1',
        아이스크림: '2',
      };
      expect(weekdayDiscount('4', orderWeekday)).toBe(3 * 2023);
      expect(weekdayDiscount('5', orderWeekday)).toBe(3 * 2023);
    });
    it('주말 주문 테스트', () => {
      const orderWeekend = {
        초코케이크: '1',
        아이스크림: '2',
      };
      expect(weekdayDiscount('1', orderWeekend)).toBe(0);
      expect(weekdayDiscount('2', orderWeekend)).toBe(0);
    });
  });

  describe('weekendDiscount', () => {
    it('주말 주문 테스트', () => {
      const orderWeekend = {
        티본스테이크: '1',
        바비큐립: '1',
      };
      expect(weekendDiscount('1', orderWeekend)).toBe(2 * 2023);
      expect(weekendDiscount('2', orderWeekend)).toBe(2 * 2023);
    });

    it('평일 주문 테스트', () => {
      const orderWeekday = {
        티본스테이크: '1',
        바비큐립: '1',
      };
      expect(weekendDiscount('4', orderWeekday)).toBe(0);
      expect(weekendDiscount('7', orderWeekday)).toBe(0);
    });
  });

  describe('specialDiscount', () => {
    it('특별 할인일 테스트', () => {
      expect(specialDiscount('3')).toBe(1000);
      expect(specialDiscount('10')).toBe(1000);
      expect(specialDiscount('17')).toBe(1000);
      expect(specialDiscount('24')).toBe(1000);
      expect(specialDiscount('25')).toBe(1000);
      expect(specialDiscount('31')).toBe(1000);
    });

    it('특별 할인일이 아닐 때 테스트', () => {
      expect(specialDiscount('1')).toBe(0);
      expect(specialDiscount('4')).toBe(0);
      expect(specialDiscount('11')).toBe(0);
      expect(specialDiscount('18')).toBe(0);
      expect(specialDiscount('26')).toBe(0);
    });
  });
});
