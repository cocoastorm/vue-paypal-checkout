import PropHook from '@/util/propHook';
import PropHookManager from '@/util/propHookManager';

const getPropHooks = (type, num) => {
  const hooks = [];
  for (let i = 0; i < num; i += 1) {
    hooks[i] = new PropHook(`some-name-${num}`, `some-paypal-name-${num}`, type);
  }
  return hooks;
};

const getHooks = () => ({
  transactions: getPropHooks('transaction', 10),
  buttons: getPropHooks('button', 10),
});

describe('PropHookManager', () => {
  const { transactions, buttons } = getHooks();

  it('constructor accepts object with transactions and/or button hooks', () => {
    const manager = new PropHookManager(transactions, buttons);
    expect(manager.hooks).toEqual({ transactions, buttons });
  });
});
