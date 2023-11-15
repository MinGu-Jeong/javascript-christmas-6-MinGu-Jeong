import { Console } from '@woowacourse/mission-utils';
import InputView from '../src/InputView';
import { isValidDate } from '../src/Validation';

jest.mock('@woowacourse/mission-utils', () => ({
  Console: {
    readLineAsync: jest.fn(),
    print: jest.fn(),
  },
}));

describe('InputView', () => {
  describe('readDate', () => {
    it('날짜 입력 및 검증', async () => {
      const validDate = '3';
      Console.readLineAsync.mockResolvedValueOnce(validDate);
      jest.spyOn(InputView, 'guideEvent');
      const result = await InputView.readDate();

      expect(Console.readLineAsync).toHaveBeenCalledWith(
        '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n'
      );
    });
  });
});
