import Vue from 'vue'
import AdvancedPayPal from '@/components/AdvancedPayPal'

const credentials = {
  sandbox: 'Ad1voWYq3VL8J4jy6zWARKwz4tjbuDl_TFBa3WQqy_DwAFWd7hkU4i99jijGqaoqU3E-ODqXDayVnOdl',
  production: 'AVZhosFzrnZ5Mf3tiOxAD0M6NHv8pcB2IFNHAfp_h69mmbd-LElFYkJUSII3Y0FPbm7S7lxBuqWImLbl'
}

let getComponentWithProps = function (Component, propsData) {
  const Ctor = Vue.extend(Component)
  return new Ctor({ propsData }).$mount()
}

describe('Methods within AdvancedPayPal.vue', () => {
  let testComponent = getComponentWithProps(AdvancedPayPal, {
    createPayment: function () {
      Promise.resolve({ paymentID: 'dummyId' })
    },
    executePayment: function (paymentID, payerID) {
      Promise.resolve({ paymentID, payerID })
    }
  })

  describe('Environment', () => {
    it('has env computed property', () => {
      expect(testComponent).to.have.property('env')
      expect(testComponent.env).to.be.a('string')
    })

    it('env should return sandbox', () => {
      expect(testComponent.env).to.equal('sandbox')
    })
  })

  describe('PayPalPayment()', () => {
    it('has PayPalPayment()', () => {
      expect(testComponent).have.property('PayPalPayment')
      expect(testComponent.PayPalPayment).to.be.a('function')
    })
  })
})
