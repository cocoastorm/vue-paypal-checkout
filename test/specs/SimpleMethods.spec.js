import { createLocalVue, shallow } from 'vue-test-utils';
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
    invoiceNumber: '201705051001',
    items: getItems(),
  };
}

describe('Methods within PayPalCheckout.vue', () => {
  let checkout = shallow(PayPalCheckout, {
    attachToDocument: true,
    propsData: getProps(),
  });

  describe('Environment', () => {
    it('dev prop is false', () => {
      expect(checkout.hasProp('dev', false)).to.equal(true);
    });
  });

  describe('vue.PayPalPayment()', () => {
    const localVue = createLocalVue();
    checkout = shallow(PayPalCheckout, {
      localVue,
      propsData: getProps(),
    });

    it('has PayPalPayment()', () => {
      expect(checkout.vm).to.have.property('PayPalPayment');
      expect(checkout.vm.PayPalPayment).to.be.a('function');
    });

    it('returns a payment object', () => {
      const payment = checkout.vm.PayPalPayment();
      payment.then((p) => {
        expect(p).to.be.a('object');
      });
    });

    it('payment object has transactions array', () => {
      const payment = checkout.vm.PayPalPayment();
      payment.then((p) => {
        expect(p).to.have.property('transactions');
        expect(p.transactions).to.be.instanceOf(Array);
      });
    });

    it('payment object has one single transaction', () => {
      const payment = checkout.vm.PayPalPayment();
      payment.then((p) => {
        const transactions = p.transactions;
        expect(transactions).to.have.length.of(1);
      });
    });

    it('transaction has the right amount', () => {
      const payment = checkout.vm.PayPalPayment();
      payment.then((p) => {
        const transaction = p.transactions[0];
        expect(transaction).to.have.property('amount');
        expect(transaction.amount).to.equal(30.00);
      });
    });

    it('transaction has the right currency', () => {
      const payment = checkout.vm.PayPalPayment();
      payment.then((p) => {
        const transaction = p.transactions[0];
        expect(transaction).to.have.property('currency');
        expect(transaction.currency).to.equal('USD');
      });
    });

    it('transaction has the right invoice number', () => {
      const payment = checkout.vm.PayPalPayment();
      payment.then((p) => {
        const transaction = p.transactions[0];
        expect(transaction).to.have.property('invoice_number');
        expect(transaction.invoice_number).to.equal('201705051001');
      });
    });

    it('transaction has a item_list', () => {
      const payment = checkout.vm.PayPalPayment();
      payment.then((p) => {
        const transaction = p.transactions[0];
        expect(transaction).to.have.property('item_list');
        expect(transaction.item_list).to.be('Object');
      });
    });

    it('transaction has items array', () => {
      const payment = checkout.vm.PayPalPayment();
      payment.then((p) => {
        const itemList = p.transactions[0].item_list;
        expect(itemList.items).to.be.instanceOf(Array);
        expect(itemList.items).to.have.deep.members(getItems());
      });
    });
  });

  describe('action methods', () => {
    it('has onAuthorize', () => {
      expect(checkout.vm).to.have.property('onAuthorize');
      expect(checkout.vm.onAuthorize).to.be.a('function');
    });

    it('has onCancel', () => {
      expect(checkout.vm).to.have.property('onCancel');
      expect(checkout.vm.onCancel).to.be.a('function');
    });
  });
});
