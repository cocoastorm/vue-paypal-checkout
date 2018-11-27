import { createLocalVue, shallowMount } from '@vue/test-utils';
import { createRenderer } from 'vue-server-renderer';
import PayPalCheckout from '@/components/PayPalCheckout.vue';

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
  let checkout;

  beforeEach(() => {
    const localVue = createLocalVue();
    checkout = shallowMount(PayPalCheckout, {
      attachToDocument: true,
      propsData: getProps(),
      localVue,
    });
  });

  test('should have the amount prop', () => {
    expect(checkout.props().amount).toEqual('30.00');
  });

  test('should have the client prop with production and sandbox', () => {
    expect(checkout.vm.client).toEqual(credentials);
  });

  test('should have the currency prop', () => {
    expect(checkout.vm).toEqual(expect.objectContaining({
      currency: expect.any(String),
    }));
    expect(checkout.vm.currency.length).toBeGreaterThan(2);
  });

  test('should have the commit prop', () => {
    expect(checkout.props().commit).toBe(true);
  });

  test('should have the env prop', () => {
    expect(checkout.props().env).toBeTruthy();
  });

  test('should have the invoiceNumber prop', () => {
    expect(checkout.props().invoiceNumber).toEqual('201705051001');
  });

  test('should have the items prop', () => {
    expect(checkout.vm).toEqual(expect.objectContaining({
      items: expect.any(Array),
    }));
  });

  // TODO: renable after jsdom fixes css parsing
  describe('iframe rendering', () => {
    test('div', () => {
      const div = checkout.find('div');
      expect(div.is('div')).toBe(true);
    });

    test('has zoid class', () => {
      expect(checkout.contains('.zoid-visible')).toBe(true);
    });

    test('has same HTML structure', () => {
      const renderer = createRenderer();
      renderer.renderToString(checkout.vm, (err, str) => {
        if (err) throw new Error(err);
        expect(str).toMatchSnapshot();
      });
    });
  });
});
