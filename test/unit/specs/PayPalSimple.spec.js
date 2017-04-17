import Vue from 'vue'
import SimplePayPal from '@/components/SimplePayPal'

const credentials = {
  sandbox: 'Ad1voWYq3VL8J4jy6zWARKwz4tjbuDl_TFBa3WQqy_DwAFWd7hkU4i99jijGqaoqU3E-ODqXDayVnOdl',
  production: 'AVZhosFzrnZ5Mf3tiOxAD0M6NHv8pcB2IFNHAfp_h69mmbd-LElFYkJUSII3Y0FPbm7S7lxBuqWImLbl'
}

let getComponentWithProps = function (Component, propsData) {
  const Ctor = Vue.extend(Component)
  return new Ctor({ propsData }).$mount()
}

describe('SimplePayPal.vue', () => {
  it('should have the correct props', (done) => {
    const simple = getComponentWithProps(SimplePayPal, {
      amount: '1.00',
      client: credentials,
      currency: 'USD',
      commit: true
    })

    Vue.nextTick(() => {
      expect(simple).to.have.property('amount')
      expect(simple.amount).to.be.a('string')
      expect(simple.amount).to.equal('1.00')

      expect(simple).to.have.property('client')
      expect(simple.client).to.be.a('object')
      expect(simple.client).to.have.property('production')
      expect(simple.client.production).to.be.a('string')
      expect(simple.client.production).to.have.length.above(5)
      expect(simple.client).to.have.property('sandbox')
      expect(simple.client.sandbox).to.be.a('string')
      expect(simple.client.sandbox).to.have.length.above(5)

      expect(simple).to.have.property('currency')
      expect(simple.currency).to.be.a('string')
      expect(simple.currency).to.have.length.within(2, 5)

      expect(simple).to.have.property('commit')
      expect(simple.commit).to.be.a('boolean')
      expect(simple.commit).to.equal(true)

      expect(simple).to.have.property('dev')
      expect(simple.dev).to.be.a('boolean')
      expect(simple.dev).to.equal(process.env.NODE_ENV !== 'production')

      done()
    })
  })

  it('should render an iframe', (done) => {
    const vm = getComponentWithProps(SimplePayPal, {
      amount: '1.00',
      client: credentials,
      currency: 'USD',
      commit: true
    })

    Vue.nextTick(() => {
      // test mounted div
      const mount = vm
      expect(mount.$el.textContent).to.eql('')
      expect(mount.$el.tagName).to.eql('DIV')
      expect(mount.$el.querySelector('.xcomponent-show-component'))

      done()
    })
  })
})
