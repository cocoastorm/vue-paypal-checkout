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
    type: Object,
    required: false,
  };
};

paypalProp.prototype.getChange = function getChange(src) {
  const value = src[this.name];

  if (typeof value !== 'undefined') {
    return {
      name: this.propName,
      value,
    };
  }

  return undefined;
};

export default paypalProp;

export const propTypes = {
  BUTTON: 'button',
  TRANSACTION: 'transaction',
};
