import { createLocalVue, shallow } from 'vue-test-utils';
import { expect } from 'chai';
import PayPalCheckout from '../../src/components/PayPalCheckout.vue';

const credentials = {
  sandbox: 'Ad1voWYq3VL8J4jy6zWARKwz4tjbuDl_TFBa3WQqy_DwAFWd7hkU4i99jijGqaoqU3E-ODqXDayVnOdl',
  production: 'AVZhosFzrnZ5Mf3tiOxAD0M6NHv8pcB2IFNHAfp_h69mmbd-LElFYkJUSII3Y0FPbm7S7lxBuqWImLbl',
};

function getItems() {
  return [
    {
      name: 'hat',
      description: 'Brown hat.',
      quantity: '5',
      price: '3',
      currency: 'USD',
    },
    {
      name: 'handbag',
      description: 'Black handbag.',
      quantity: '1',
      price: '15',
      currency: 'USD',
    },
  ];
}

function getProps() {
  return {
    amount: '30.00',
    client: credentials,
    currency: 'USD',
    commit: true,
    dev: true,
    invoiceNumber: '201705051001',
    items: getItems(),
  };
}

describe('PayPalCheckout.vue', () => {
  const localVue = createLocalVue();
  const checkout = shallow(PayPalCheckout, {
    attachToDocument: true,
    propsData: getProps(),
    localVue,
  });

  it('should have the amount prop', () => {
    expect(checkout.hasProp('amount', '30.00')).to.equal(true);
  });

  it('should have the client prop with production and sandbox', () => {
    expect(checkout.vm.client).to.deep.equal(credentials);
  });

  it('should have the currency prop', () => {
    expect(checkout.vm).to.have.property('currency');
    expect(checkout.vm.currency).to.be.a('string');
    expect(checkout.vm.currency).to.have.length.within(2, 5);
  });

  it('should have the commit prop', () => {
    expect(checkout.hasProp('commit', true)).to.equal(true);
  });

  it('should have the dev prop', () => {
    expect(checkout.hasProp('dev', true)).to.equal(true);
  });

  it('should have the invoiceNumber prop', () => {
    expect(checkout.hasProp('invoiceNumber', '201705051001')).to.equal(true);
  });

  it('should have the items prop', () => {
    expect(checkout.vm).to.have.property('items');
    expect(checkout.vm.items).to.be.instanceOf(Array);
  });

  describe('iframe rendering', () => {
    it('div', () => {
      const div = checkout.find('div');
      expect(div.is('div')).to.equal(true);
    });

    it('has xcomponent class', () => {
      const html = checkout.html();
      expect(html).contains('xcomponent-visible');
    });
  });
});
