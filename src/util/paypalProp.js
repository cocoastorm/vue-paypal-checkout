export default class paypalProp {
  constructor(prop) {
    const define = (name, param, defaultParam) => {
      const isDefined = param !== undefined
        && param !== null;
      const hasDefault = defaultParam !== undefined
        && defaultParam !== null;

      if (isDefined) {
        this[name] = param;
      } else if (hasDefault) {
        this[name] = defaultParam;
      } else {
        this[name] = undefined; // TODO: throw err?
      }
    };

    define('name', prop.name);
    define('propName', prop.paypalName, prop.name);
    define('injection', prop.injection, 'button');
    define('type', prop.type, Object);
    define('required', prop.required, false);
    define('validator', prop.validator, undefined);

    this.transforms = [];
  }

  getVmProp() {
    return {
      type: this.type,
      required: this.required,
      validator: this.validator,
    };
  }

  addChangeTransform(callable) {
    this.transforms.push(callable);
  }

  getChange(src) {
    let value = src[this.name];

    // change the value if necessary
    if (value !== undefined && value !== null) {
      this.transforms.forEach((transform) => {
        value = transform(value);
      });
    }

    return {
      name: this.propName,
      value,
    };
  }
}

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
