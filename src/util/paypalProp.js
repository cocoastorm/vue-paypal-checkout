function paypalProp(prop) {
  /* eslint-disable no-param-reassign */
  const define = (function getDefine(object) {
    return function def(name, param, defaultParam) {
      const isDefined = typeof param !== 'undefined'
        && param !== null;
      const hasDefault = typeof defaultParam !== 'undefined'
        && defaultParam !== null;

      if (isDefined) object[name] = param;
      else if (hasDefault) object[name] = defaultParam;
      else object[name] = null; // TODO: throw err?
    };
  }(this));

  define('name', prop.name);
  define('propName', prop.paypalName, prop.name);
  define('injection', prop.injection, 'button');
  define('type', prop.type, Object);
  define('required', prop.required, false);
}

paypalProp.prototype.getVmProp = function getVmProp() {
  return {
    type: this.type,
    required: this.required,
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
