import { expect } from 'chai';

global.jestExpect = global.expect;
global.expect = expect;

// mock window for `paypal-checkout`
Object.defineProperty(window.location, 'host', {
  writeable: true,
  value: 'localhost',
});
