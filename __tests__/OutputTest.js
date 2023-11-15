import OutputView from '../src/OutputView';
import { Console } from '@woowacourse/mission-utils';
import * as MenuModule from '../src/Menu';

jest.mock('@woowacourse/mission-utils', () => ({
  Console: {
    print: jest.fn(),
  },
}));

jest.mock('../src/Menu');

describe('OutputView', () => {
  beforeEach(() => {
    Console.print.mockClear();
  });

  describe('printMenu', () => {
    it('주문내역 출력 테스트', () => {
      const order = { 티본스테이크: '1', 바비큐립: '2' };
      OutputView.printMenu(order);
      expect(Console.print).toHaveBeenCalledWith('<주문 메뉴>');
      expect(Console.print).toHaveBeenCalledWith('티본스테이크 1개');
      expect(Console.print).toHaveBeenCalledWith('바비큐립 2개');
    });
  });

  describe('printAmountBeforeDiscount', () => {
    it('할인전 총 주문 금액 출력 테스트', () => {
      MenuModule.amountBeforeDiscount.mockReturnValue(100000);
      OutputView.printAmountBeforeDiscount({ 티본스테이크: '1' });
      expect(Console.print).toHaveBeenCalledWith('\n<할인 전 총주문 금액>');
      expect(Console.print).toHaveBeenCalledWith('100,000원');
    });
  });

  describe('printServiceMenu', () => {
    it('증정 메뉴 출력 테스트', () => {
      MenuModule.isServiceMenu.mockReturnValueOnce(25000);
      OutputView.printServiceMenu(120000);
      expect(Console.print).toHaveBeenCalledWith('\n<증정 메뉴>');
      expect(Console.print).toHaveBeenCalledWith('샴페인 1개');

      MenuModule.isServiceMenu.mockReturnValueOnce(0);
      OutputView.printServiceMenu(50000);
      expect(Console.print).toHaveBeenCalledWith('\n<증정 메뉴>');
      expect(Console.print).toHaveBeenCalledWith('없음');
    });
  });
  describe('printBenefitList', () => {
    it('할인 전 금액 계산 테스트', () => {
      const date = '4';
      const order = { 초코케이크: '1', 아이스크림: '2' };
      const amount = 20000;

      MenuModule.dDayDiscount.mockReturnValue(1000);
      MenuModule.weekdayDiscount.mockReturnValue(2023);
      MenuModule.weekendDiscount.mockReturnValue(0);
      MenuModule.specialDiscount.mockReturnValue(1000);
      MenuModule.isServiceMenu.mockReturnValue(0);

      OutputView.printBenefitList(date, order, amount);

      expect(Console.print).toHaveBeenCalledWith('\n<혜택 내역>');
      expect(Console.print).toHaveBeenCalledWith(
        '크리스마스 디데이 할인: -1,000원'
      );
      expect(Console.print).toHaveBeenCalledWith('평일 할인: -2,023원');
      expect(Console.print).not.toHaveBeenCalledWith('주말 할인: -0원');
      expect(Console.print).toHaveBeenCalledWith('특별 할인: -1,000원');
    });

    it('없음 출력 테스트', () => {
      const date = '5';
      const order = { 티본스테이크: '1' };
      const amount = 9000;

      MenuModule.dDayDiscount.mockReturnValue(0);
      MenuModule.weekdayDiscount.mockReturnValue(0);
      MenuModule.weekendDiscount.mockReturnValue(0);
      MenuModule.specialDiscount.mockReturnValue(0);
      MenuModule.isServiceMenu.mockReturnValue(0);

      OutputView.printBenefitList(date, order, amount);

      expect(Console.print).toHaveBeenCalledWith('\n<혜택 내역>');
      expect(Console.print).toHaveBeenCalledWith('없음');
    });
  });
  describe('printBenefitAmount', () => {
    it('할인 금액 테스트', () => {
      const totalDiscountAmount = 5000;
      const amount = 20000;

      OutputView.printBenefitAmount(totalDiscountAmount, amount);

      expect(Console.print).toHaveBeenCalledWith('\n<총혜택 금액>');
      expect(Console.print).toHaveBeenCalledWith('-5,000원');
      expect(Console.print).toHaveBeenCalledWith('\n<할인 후 예상 결제 금액>');
      expect(Console.print).toHaveBeenCalledWith('15,000원');
    });

    it('할인 금액 없는 경우 테스트', () => {
      const totalDiscountAmount = 0;
      const amount = 9000;

      OutputView.printBenefitAmount(totalDiscountAmount, amount);

      expect(Console.print).toHaveBeenCalledWith('\n<총혜택 금액>');
      expect(Console.print).toHaveBeenCalledWith('0원');
      expect(Console.print).toHaveBeenCalledWith('\n<할인 후 예상 결제 금액>');
      expect(Console.print).toHaveBeenCalledWith('9,000원');
    });
  });
  describe('printBadge', () => {
    it('금액에 따른 배지 증정 테스트', () => {
      OutputView.printBadge(20000);
      expect(Console.print).toHaveBeenCalledWith('\n<12월 이벤트 배지>');
      expect(Console.print).toHaveBeenCalledWith('산타');

      OutputView.printBadge(15000);
      expect(Console.print).toHaveBeenCalledWith('\n<12월 이벤트 배지>');
      expect(Console.print).toHaveBeenCalledWith('트리');

      OutputView.printBadge(5000);
      expect(Console.print).toHaveBeenCalledWith('\n<12월 이벤트 배지>');
      expect(Console.print).toHaveBeenCalledWith('없음');

      OutputView.printBadge(0);
      expect(Console.print).toHaveBeenCalledWith('\n<12월 이벤트 배지>');
      expect(Console.print).toHaveBeenCalledWith('없음');
    });
  });
});
