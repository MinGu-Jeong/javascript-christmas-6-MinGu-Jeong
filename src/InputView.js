import { Console } from '@woowacourse/mission-utils';
import { isValidDate, validateOrder } from './Validation.js';
import { separateMenuAndCount } from './Menu.js';
import OutputView from './OutputView.js';
import { MESSAGE } from './constants/Message.js';
import { ERROR } from './constants/Error.js';

const InputView = {
  date: null,
  guide() {
    Console.print(MESSAGE.guide);
  },

  async readDate() {
    let input;
    while (true) {
      input = await Console.readLineAsync(MESSAGE.date);
      if (isValidDate(input)) {
        break;
      }
      Console.print(ERROR.invalidDate);
    }
    this.date = input;
    return input;
  },

  async readMenu() {
    while (true) {
      const input = await Console.readLineAsync(MESSAGE.menu);
      const menu = separateMenuAndCount(input);
      if (validateOrder(menu)) {
        this.guideEvent(this.date);
        OutputView.printMenu(menu);
        return menu;
      }
      Console.print(ERROR.invalidOrder);
    }
  },

  guideEvent(date) {
    Console.print(
      `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`
    );
  },
};

export default InputView;
