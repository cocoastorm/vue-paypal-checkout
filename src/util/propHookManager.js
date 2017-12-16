export default class PropHookManager {
  constructor(transactionHooks, buttonHooks) {
    this.hooks = {
      transactions: transactionHooks,
      buttons: buttonHooks,
    };
  }

  apply(type, vm, obj) {
    const hooks = this.hooks[type] || [];

    hooks.forEach((hook) => {
      hook.inject(vm, obj);
    });
  }

  applyTransactions(vueData, transactions) {
    return this.apply('transactions', vueData, transactions);
  }

  applyButton(vueData, button) {
    return this.apply('buttons', vueData, button);
  }
}
