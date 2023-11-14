import InputView from './InputView.js';
import OutputView from './OutputView.js';
class App {
  async run() {
    InputView.guide();
    const date = await InputView.readDate();
    const menu = await InputView.readMenu();
    const amount = OutputView.printAmountBeforeDiscount(menu);
    OutputView.printServiceMenu(amount);
    const totalDiscountAmount = OutputView.printBenefitList(date, menu, amount);
    OutputView.printBenefitAmount(totalDiscountAmount, amount);
    OutputView.printBadge(totalDiscountAmount);
  }
}

export default App;
