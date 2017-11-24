export default class PropHook {
  constructor(name, pName, injectType = 'button', mutateProp = null) {
    this.name = name;
    this.paypalName = pName;
    this.injectType = injectType;

    // if we need to change the prop before using it...
    this.mutateProp = mutateProp;
  }

  // the prop may either be defined as a property
  // in the button object in paypal.Button.render
  // or, in the transaction object when a PayPal payment is made
  inject(vm, obj) {
    let prop = vm[this.name];
    if (prop !== undefined && prop !== null) {
      if (this.mutateProp !== null) {
        prop = this.mutateProp(prop);
      }

      Object.defineProperty(obj, this.paypalName, {
        value: prop,
        writeable: true,
        configurable: true,
        enumerable: true,
      });
    }
  }
}
