import Vue from 'vue'
import AdvancedPayPal from 'src/components/AdvancedPayPal'

let getComponentWithProps = function (Component, propsData) {
  const Ctor = Vue.extend(Component)
  return new Ctor({ propsData }).$mount()
}

describe('AdvancedPayPal.vue', () => {
  it('should have a methods prop', () => {
    let paypal = getComponentWithProps(AdvancedPayPal, {
      methods: {
        createPayment: function () {
          Promise.resolve({ paymentID: 'dummyId' })
        },
        executePayment: function (paymentID, payerID) {
          Promise.resolve({ paymentID, payerID })
        }
      }
    })

    expect(paypal).to.have.property('methods')
    expect(paypal.methods).to.be.a('object')

    expect(paypal.methods).to.have.property('createPayment')
    expect(paypal.methods.createPayment).to.be.a('function')

    expect(paypal.methods).to.have.property('executePayment')
    expect(paypal.methods.executePayment).to.be.a('function')
  })

  describe('Payments', () => {
    describe('createPayment()', () => {
      it('should return paymentID in a Promise', (done) => {
        let paypal = getComponentWithProps(AdvancedPayPal, {
          methods: {
            createPayment: function () {
              return Promise.resolve({ paymentID: 'dummyId' })
            },
            executePayment: function (paymentID, payerID) {
              return Promise.resolve({ paymentID, payerID })
            }
          }
        })

        paypal.methods.createPayment()
        .then((response) => {
          expect(response).to.have.property('paymentID')
          done()
        })
      })
    })

    describe('executePayment()', () => {
      it('should take in paymentID and payerID', () => {
        let paypal = getComponentWithProps(AdvancedPayPal, {
          methods: {
            createPayment: function () {
              return Promise.resolve({ paymentID: 'dummyId' })
            },
            executePayment: function (paymentID, payerID) {
              return Promise.resolve({ paymentID, payerID })
            }
          }
        })

        let executePayment = paypal.methods.executePayment(1, 5)
        expect(executePayment).to.be.a('object')
      })
    })
  })
})
