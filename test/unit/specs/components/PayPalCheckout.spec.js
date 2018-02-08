import { createLocalVue, shallow } from '@vue/test-utils';
import { createRenderer } from 'vue-server-renderer';
import PayPalCheckout from '../../../../src/components/PayPalCheckout.vue';

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
    id: 'vue-paypal-test',
    amount: '30.00',
    client: credentials,
    currency: 'USD',
    commit: true,
    env: 'sandbox',
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
    expect(checkout.props().amount).toEqual('30.00');
  });

  it('should have the client prop with production and sandbox', () => {
    expect(checkout.vm.client).toEqual(credentials);
  });

  it('should have the currency prop', () => {
    expect(checkout.vm).toEqual(expect.objectContaining({
      currency: expect.any(String),
    }));
    expect(checkout.vm.currency.length).toBeGreaterThan(2);
  });

  it('should have the commit prop', () => {
    expect(checkout.props().commit).toBe(true);
  });

  it('should have the env prop', () => {
    expect(checkout.props().env).toBeTruthy();
  });

  it('should have the invoiceNumber prop', () => {
    expect(checkout.props().invoiceNumber).toEqual('201705051001');
  });

  it('should have the items prop', () => {
    expect(checkout.vm).toEqual(expect.objectContaining({
      items: expect.any(Array),
    }));
  });

  // TODO: renable after jsdom fixes css parsing
  describe('iframe rendering', () => {
    it('div', () => {
      const div = checkout.find('div');
      expect(div.is('div')).toBe(true);
    });

    it('has xcomponent class', () => {
      expect(checkout.contains('.xcomponent-visible')).toBe(true);
    });

    it('has same HTML structure', () => {
      const renderer = createRenderer();
      renderer.renderToString(checkout.vm, (err, str) => {
        if (err) throw new Error(err);
        expect(str).toMatchSnapshot();
      });
    });
  });
});
