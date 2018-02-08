import PayPalProp, { propTypes } from './util/paypalProp';

const props = [
  new PayPalProp({ name: 'buttonStyle', paypalName: 'style', type: propTypes.BUTTON }),
  new PayPalProp({ name: 'braintree', type: propTypes.BUTTON }),
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
