import Vue from 'vue'
import PayPalCheckout from '@/components/PayPalCheckout'

const credentials = {
  sandbox: 'Ad1voWYq3VL8J4jy6zWARKwz4tjbuDl_TFBa3WQqy_DwAFWd7hkU4i99jijGqaoqU3E-ODqXDayVnOdl',
  production: 'AVZhosFzrnZ5Mf3tiOxAD0M6NHv8pcB2IFNHAfp_h69mmbd-LElFYkJUSII3Y0FPbm7S7lxBuqWImLbl'
}

let getComponentWithProps = function (Component, propsData) {
  const Ctor = Vue.extend(Component)
  return new Ctor({ propsData }).$mount()
}

let getItems = function () {
  return [
    {
      "name": "hat",
      "description": "Brown hat.",
      "quantity": "5",
      "price": "3",
      "currency": "USD"
    },
    {
      "name": "handbag",
      "description": "Black handbag.",
      "quantity": "1",
      "price": "15",
      "currency": "USD"
    }
  ]
}

describe('Methods within PayPalCheckout.vue', () => {
  let testComponent = getComponentWithProps(PayPalCheckout, {
    amount: '30.00',
    client: credentials,
    currency: 'USD',
    commit: true,
    invoiceNumber: '201705051001',
    items: getItems()
  })

  describe('Environment', () => {
    it('dev prop is false', () => {
      expect(testComponent.dev).to.be.a('boolean')
      expect(testComponent.dev).to.equal(false)
    })

    it('has computed env property', () => {
      expect(testComponent).to.have.property('env')
    })

    // TODO: stub process.env.NODE_ENV

    // describe('development', () => {
    //   beforeEach(() => {
    //     process.env['NODE_ENV'] = 'development'
    //   })

    //   it('should return sandbox', () => {
    //     const env = testComponent.env
    //     expect(env).to.be.a('string')
    //     expect(env).to.equal('sandbox')
    //   })
    // })

    // describe('production', () => {
    //   beforeEach(() => {
    //     process.env['NODE_ENV'] = 'production'
    //   })

    //   it('should return production', () => {
    //     process.env['NODE_ENV'] = 'production'
    //     const env = testComponent.env
    //     expect(env).to.be.a('string')
    //     expect(env).to.equal('production')
    //   })
    // })
  })

  describe('vue.PayPalPayment()', () => {
    it('has PayPalPayment()', () => {
      expect(testComponent).to.have.property('PayPalPayment')
      expect(testComponent.PayPalPayment).to.be.a('function')
    })

    it('returns a payment object', () => {
      const payment = testComponent.PayPalPayment()
      payment.then((p) => {
        expect(p).to.be.a('object')
      })
    })

    it('payment object has transactions array', () => {
      const payment = testComponent.PayPalPayment()
      payment.then((payment) => {
        expect(payment).to.have.property('transactions')
        expect(payment.transactions).to.be.instanceOf(Array)
      })
    })

    it('payment object has one single transaction', () => {
      const payment = testComponent.PayPalPayment()
      payment.then((p) => {
        const transactions = p.transactions
        expect(transactions).to.have.length.of(1)
      })
    })

    it('transaction has the right amount', () => {
      const payment = testComponent.PayPalPayment()
      payment.then((p) => {
        const transaction = p.transactions[0]
        expect(transaction).to.have.property('amount')
        expect(transaction.amount).to.equal(30.00)
      })
    })

    it('transaction has the right currency', () => {
      const payment = testComponent.PayPalPayment()
      payment.then((p) => {
        const transaction = p.transactions[0]
        expect(transaction).to.have.property('currency')
        expect(transaction.currency).to.equal('USD')
      })
    })

    it('transaction has the right invoice number', () => {
      const payment = testComponent.PayPalPayment()
      payment.then((p) => {
        const transaction = p.transactions[0]
        expect(transaction).to.have.property('invoice_number')
        expect(transaction.invoice_number).to.equal('201705051001')
      })
    })

    it('transaction has a item_list', () => {
      const payment = testComponent.PayPalPayment()
      payment.then((p) => {
        const transaction = p.transactions[0]
        expect(transaction).to.have.property('item_list')
        expect(transaction.item_list).to.be('Object')
      })
    })

    it('transaction has items array', () => {
      const payment = testComponent.PayPalPayment()
      payment.then((p) => {
        const itemList = p.transactions[0].item_list
        expect(itemList.items).to.be.instanceOf(Array)
        expect(itemList.items).to.have.deep.members(getItems())
      })
    })
  })

  describe('action methods', () => {
    it('has onAuthorize', () => {
      expect(testComponent).to.have.property('onAuthorize')
      expect(testComponent.onAuthorize).to.be.a('function')
    })

    it('has onCancel', () => {
      expect(testComponent).to.have.property('onCancel')
      expect(testComponent.onCancel).to.be.a('function')
    })
  })
})
