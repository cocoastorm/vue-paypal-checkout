const requiredProps = [
  ['amount'],
  ['currency', 'USD'],
];

const optionalProps = [
  ['id'],
  ['invoiceNumber'],
];

const specificProps = [
  {
    name: 'env',
    type: String,
    required: false,
    default: 'production',
    validator: function (value) {
      return [
        'sandbox',
        'production'
      ].indexOf(value) !== -1;
    },
  },
  { name: 'client', type: Object, required: true },
  // eslint-disable-next-line
  { name: 'commit', type: Boolean, required: false, default: true },
  { name: 'items', type: Array, required: false },
  { name: 'buttonStyle', type: Object, required: false },
  { name: 'experience', type: Object, required: false },
];

export default function () {
  const props = {};

  // TODO: make type configurable
  // all required props are type String for now
  requiredProps.forEach(([name, def]) => {
    props[name] = {
      type: String,
      required: true,
      default: (typeof def !== 'undefined')
        ? def
        : undefined,
    };
  });

  // TODO: make type configurable
  // all optional props are type String for now
  optionalProps.forEach(([name, def]) => {
    props[name] = {
      type: String,
      required: false,
      default: (typeof def !== 'undefined')
        ? def
        : undefined,
    };
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
