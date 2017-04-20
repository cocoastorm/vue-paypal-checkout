import Vue from 'vue'
import AdvancedPayPal from '@/components/AdvancedPayPal'

let getComponentWithProps = function (Component, propsData) {
  const Ctor = Vue.extend(Component)
  return new Ctor({ propsData }).$mount()
}

describe('AdvancedPayPal.vue', () => {
  let advancedPayPal = getComponentWithProps(AdvancedPayPal, {
    createPayment: function () {
      Promise.resolve({ paymentID: 'dummyId' })
    },
    executePayment: function (paymentID, payerID) {
      Promise.resolve({ paymentID, payerID })
    }
  })

  it('should have a createPayment prop', done => {
    Vue.nextTick(() => {
      expect(advancedPayPal).to.have.property('createPayment')
      expect(advancedPayPal.createPayment).to.be.a('function')

      done()
    })
  })

  it('should have a executePayment prop', done => {
    Vue.nextTick(() => {
      expect(advancedPayPal).to.have.property('executePayment')
      expect(advancedPayPal.executePayment).to.be.a('function')

      done()
    })
  })

  it('should have a default dev prop', done => {
    Vue.nextTick(() => {
      expect(advancedPayPal).to.have.property('dev')
      expect(advancedPayPal.dev).to.be.a('boolean')
      expect(advancedPayPal.dev).to.equal(process.env.NODE_ENV !== 'production')
      done()
    })
  })
})
