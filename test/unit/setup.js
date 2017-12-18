import Vue from 'vue';

Vue.config.productionTip = false;

// mock window for `paypal-checkout`
Object.defineProperty(window.location, 'host', {
  writeable: true,
  value: 'localhost',
});
