import shortid from 'shortid';

const requiredProps = [
  ['amount'],
  ['currency', 'USD'],
];

const optionalProps = [
  ['id', shortid.generate()],
  ['invoiceNumber'],
];

const specificProps = [
  { name: 'client', type: Object, required: true },
  { name: 'commit', type: Boolean, required: false, default: true },
  { name: 'dev', type: Boolean, required: false },
  { name: 'items', type: Array, required: false },
  { name: 'buttonStyle', type: Object, required: false },
];

export default function () {
  const props = {};

  // TODO: make type configurable
  // all required props are type String for now
  requiredProps.forEach(([name, def]) => {
    if (def !== undefined) {
      props[name] = {
        type: String,
        required: true,
        default: def,
      };
    } else {
      props[name] = {
        type: String,
        required: true,
      };
    }
  });

  // TODO: make type configurable
  // all optional props are type String for now
  optionalProps.forEach(([name, def]) => {
    if (def !== undefined) {
      props[name] = {
        type: String,
        required: true,
        default: def,
      };
    } else {
      props[name] = {
        type: String,
        required: false,
      };
    }
  });

  // all specific props are declared ahead of time
  specificProps.forEach((prop) => {
    props[prop.name] = {
      type: prop.type,
      required: prop.required,
    };

    if (prop.default !== undefined) {
      props[prop.name].default = prop.default;
    }
  });

  return props;
}
