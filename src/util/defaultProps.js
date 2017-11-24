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

  // all required props are type String and are required (duh!)
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

  // all optional props are type String and aren't required (duh!)
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

  // all specific props are declared aot
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
