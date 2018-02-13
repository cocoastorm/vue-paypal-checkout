import PayPalProp, { propTypes } from './util/paypalProp';

const props = [
  new PayPalProp({ name: 'buttonStyle', paypalName: 'style', injection: propTypes.BUTTON }),
  new PayPalProp({ name: 'braintree', injection: propTypes.BUTTON }),
  new PayPalProp({ name: 'locale', type: String, injection: propTypes.BUTTON }),
];

function vmProps() {
  const vm = {};

  props.forEach((prop) => {
    vm[prop.name] = prop.getVmProp();
  });

  return vm;
}

function getTypedProps(type) {
  return props
    .filter(prop => prop.injection === type);
}

export default {
  vmProps,
  getTypedProps,
};
