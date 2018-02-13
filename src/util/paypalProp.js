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
      else object[name] = undefined; // TODO: throw err?
    };
  }(this));

  define('name', prop.name);
  define('propName', prop.paypalName, prop.name);
  define('injection', prop.injection, 'button');
  define('type', prop.type, Object);
  define('required', prop.required, false);
  define('validator', prop.validator, undefined);

  this.transforms = [];
}

paypalProp.prototype.getVmProp = function getVmProp() {
  return {
    type: this.type,
    required: this.required,
    validator: this.validator,
  };
};

paypalProp.prototype.addChangeTransform = function addChangeTransform(callable) {
  this.transforms.push(callable);
};

paypalProp.prototype.getChange = function getChange(src) {
  let value = src[this.name];

  // change the value if necessary...
  if (value !== undefined && value !== null) {
    this.transforms.forEach((transform) => {
      value = transform(value);
    });
  }

  return {
    name: this.propName,
    value,
  };
};

export default paypalProp;

export const propTypes = {
  BUTTON: 'button',
  PAYMENT: 'payment',
  TRANSACTION: 'transaction',
};

export function assignToPropertyObject(props) {
  return function assignTo(vm, type) {
    const obj = {};

    props.getTypedProps(type).forEach((item) => {
      const { name, value } = item.getChange(vm);

      if (name !== undefined && value !== undefined) {
        obj[name] = value;
      }
    });

    return obj;
  };
}
