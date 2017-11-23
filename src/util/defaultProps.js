const requiredProps = [
  'amount',
  'currency',
];

const optionalProps = [
  'id',
  'invoiceNumber',
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

  requiredProps.forEach((prop) => {
    props[prop] = {
      type: String,
      required: true,
    };
  });

  optionalProps.forEach((prop) => {
    props[prop] = {
      type: String,
      required: false,
    };
  });

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
