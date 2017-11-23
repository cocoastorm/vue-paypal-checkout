export default class PropHook {
  constructor(name, pName) {
    this.name = name;
    this.paypalName = pName;
  }

  inject(vm, paypalObject) {
    const prop = vm[this.name];
    if (prop !== undefined && prop !== null) {
      Object.defineProperty(paypalObject, this.paypalName, {
        value: prop,
        writeable: true,
        configurable: true,
        enumerable: true,
      });
    }
  }
}
