import { createLocalVue, shallowMount } from '@vue/test-utils';
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
    amount: '30.00',
    client: credentials,
    currency: 'USD',
    commit: true,
    env: 'sandbox',
    experience: {
      input_fields: {
        no_shipping: 1,
      },
    },
    invoiceNumber: '201801011001',
    items: getItems(),
  };
}

jest.mock('paypal-checkout', () => ({
  Button: {
    render: jest.fn(),
  },
  rest: {
    payment: {
      create: jest.fn((env, client, payment) => Promise.resolve(payment)),
    },
  },
}));

describe('Methods within PayPalCheckout.vue', () => {
  let checkout;

  beforeEach(() => {
    const localVue = createLocalVue();
    checkout = shallowMount(PayPalCheckout, {
      localVue,
      attachToDocument: true,
      propsData: getProps(),
    });
  });

  describe('Environment', () => {
    test('env prop is true', () => {
      expect(checkout.props().env).toEqual('sandbox');
    });
  });

  describe('vue.payment()', () => {
    test('has payment()', () => {
      expect(checkout.vm).toEqual(expect.objectContaining({
        payment: expect.any(Function),
      }));
    });

    test('returns a payment opts object', () => (
      checkout.vm.payment().then((p) => {
        expect(p).toBeInstanceOf(Object);
      })
    ));

    test('payment opts object has experience object', () => {
      checkout.vm.payment().then((p) => {
        expect(p.experience).toEqual(checkout.vm.experience);
      });
    });

    test('payment object has intent', () => {
      checkout.vm.payment().then((p) => {
        expect(p.payment).toEqual(expect.objectContaining({
          intent: expect.any(String),
        }));
      });
    });

    test('payment object has transactions array', () => (
      checkout.vm.payment().then((p) => {
        expect(p.payment).toEqual(expect.objectContaining({
          transactions: expect.any(Array),
        }));
      })));

    test('payment object has one single transaction', () => (
      checkout.vm.payment().then((p) => {
        expect(p.payment.transactions.length).toBe(1);
      })
    ));

    test('transaction has the right amount', () => (
      checkout.vm.payment().then((p) => {
        const transaction = p.payment.transactions[0];
        expect(transaction.amount).toEqual(expect.objectContaining({
          total: expect.any(String),
        }));
        expect(transaction.amount.total).toEqual('30.00');
      })
    ));

    test('transaction has the right currency', () => (
      checkout.vm.payment().then((p) => {
        const transaction = p.payment.transactions[0];
        expect(transaction.amount).toEqual(expect.objectContaining({
          currency: expect.any(String),
        }));
        expect(transaction.amount.currency).toEqual('USD');
      })
    ));

    test('transaction has the right invoice number', () => (
      checkout.vm.payment().then((p) => {
        const transaction = p.payment.transactions[0];
        expect(transaction).toEqual(expect.objectContaining({
          invoice_number: expect.any(String),
        }));
        expect(transaction.invoice_number).toEqual('201801011001');
      })
    ));

    test('transaction has a item_list', () => (
      checkout.vm.payment().then((p) => {
        const transaction = p.payment.transactions[0];
        expect(transaction).toEqual(expect.objectContaining({
          item_list: expect.any(Object),
        }));
      })
    ));

    test('transaction has items array', () => (
      checkout.vm.payment().then((p) => {
        const itemList = p.payment.transactions[0].item_list;
        expect(itemList).toEqual(expect.objectContaining({
          items: expect.any(Array),
        }));
        expect(itemList.items).toEqual(getItems());
      })
    ));
  });

  describe('action methods', () => {
    test('has onAuthorize() and onCancel()', () => {
      expect(checkout.vm).toEqual(expect.objectContaining({
        onAuthorize: expect.any(Function),
        onCancel: expect.any(Function),
      }));
    });

    test('onAuthorize() returns true and not a promise if commit is false', () => {
      const component = shallowMount(PayPalCheckout, {
        localVue: createLocalVue(),
        attachToDocument: true,
        propsData: { ...getProps(), commit: false },
      });

      expect(component.vm.onAuthorize()).toEqual(true);
    });
  });
});
