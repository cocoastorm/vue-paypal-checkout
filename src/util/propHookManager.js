export default class PropHookManager {
  constructor(propHooks) {
    this.hooks = propHooks;
  }

  getTransactionHooks() {
    return this.hooks.filter(hook => (hook.injectType === 'transaction'));
  }

  getButtonHooks() {
    return this.hooks.filter(hook => (hook.injectType === 'button'));
  }

  apply(type, vm, obj) {
    let hooks = [];

    if (type === 'transaction') hooks = this.getTransactionHooks();
    if (type === 'button') hooks = this.getButtonHooks();

    hooks.forEach((hook) => {
      hook.inject(vm, obj);
    });
  }
}
