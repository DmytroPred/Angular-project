import { CashFormaterPipe } from './cash-formater.pipe';

describe('CashFormaterPipe', () => {
  it('create an instance', () => {
    const pipe = new CashFormaterPipe();
    expect(pipe).toBeTruthy();
  });
});
