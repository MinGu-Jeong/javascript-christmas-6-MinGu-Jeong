import { Console } from '@woowacourse/mission-utils';
import InputView from '../src/InputView';
import { validateOrder } from '../src/Validation';
import { separateMenuAndCount } from '../src/Menu';
import OutputView from '../src/OutputView';

jest.mock('@woowacourse/mission-utils', () => ({
  Console: {
    readLineAsync: jest.fn(),
    print: jest.fn(),
  },
}));

jest.mock('../src/Validation');
jest.mock('../src/Menu');
jest.mock('../src/OutputView');

describe('InputView', () => {
  describe('readMenu', () => {
    it('주문 입력 테스트', async () => {
      const validInput = '티본스테이크-1,바비큐립-1';
      const order = {
        티본스테이크: '1',
        바비큐립: '1',
      };
      Console.readLineAsync.mockResolvedValueOnce(validInput);
      separateMenuAndCount.mockReturnValue(order);
      validateOrder.mockReturnValue(true);
      jest.spyOn(OutputView, 'printMenu');

      const result = await InputView.readMenu();

      expect(Console.readLineAsync).toHaveBeenCalledWith(
        '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n'
      );
      expect(separateMenuAndCount).toHaveBeenCalledWith(validInput);
      expect(validateOrder).toHaveBeenCalledWith(order);
      expect(OutputView.printMenu).toHaveBeenCalledWith(order);
      expect(result).toEqual(order);
    });
  });
});
