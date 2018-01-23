function paypalProp(prop) {
  this.name = prop.name;

  if (typeof prop.paypalName !== 'undefined') {
    this.propName = prop.paypalName;
  } else {
    this.propName = this.name;
  }

  if (typeof prop.injectionType !== 'undefined') {
    this.injection = prop.injectionType;
  } else {
    this.injection = 'button';
  }
}

paypalProp.prototype.getVmProp = function getVmProp() {
  return {
    [this.name]: {
      type: Object,
      required: false,
    },
  };
};

paypalProp.prototype.change = function change(src, dest) {
  const value = src[this.name];

  if (typeof value !== 'undefined') {
    Object.defineProperty(src, dest[this.propName], {
      value: src[this.name],
      writeable: true,
      configurable: true,
      enumerable: true,
    });
  }
};

export default paypalProp;

export const propTypes = {
  BUTTON: 'button',
  TRANSACTION: 'transaction',
};
