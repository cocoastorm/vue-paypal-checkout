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
  let testComponent = getComponentWithProps(SimplePayPal, {
    amount: '1.00',
    client: credentials,
    currency: 'USD',
    commit: true,
    invoiceNumber: '201705051001'
  })

  it('should have the amount prop', done => {
    Vue.nextTick(() => {
      expect(testComponent).to.have.property('amount')
      expect(testComponent.amount).to.be.a('string')
      expect(testComponent.amount).to.equal('1.00')

      done()
    })
  })

  it('should have the client prop with production and sandbox', done => {
    Vue.nextTick(() => {
      expect(testComponent).to.have.property('client')
      expect(testComponent.client).to.be.a('object')
      expect(testComponent.client).to.have.property('production')
      expect(testComponent.client.production).to.be.a('string')
      expect(testComponent.client.production).to.have.length.above(5)
      expect(testComponent.client).to.have.property('sandbox')
      expect(testComponent.client.sandbox).to.be.a('string')
      expect(testComponent.client.sandbox).to.have.length.above(5)

      done()
    })
  })

  it('should have the currency prop', done => {
    Vue.nextTick(() => {
      expect(testComponent).to.have.property('currency')
      expect(testComponent.currency).to.be.a('string')
      expect(testComponent.currency).to.have.length.within(2, 5)

      done()
    })
  })

  it('should have the commit prop', done => {
    Vue.nextTick(() => {
      expect(testComponent).to.have.property('commit')
      expect(testComponent.commit).to.be.a('boolean')
      expect(testComponent.commit).to.equal(true)

      done()
    })
  })

  it('should have the dev prop', done => {
    Vue.nextTick(() => {
      expect(testComponent).to.have.property('dev')
      expect(testComponent.dev).to.be.a('boolean')
      expect(testComponent.dev).to.equal(process.env.NODE_ENV !== 'production')

      done()
    })
  })

  it('should have the invoiceNumber prop', done => {
    Vue.nextTick(() => {
      expect(testComponent).to.have.property('invoiceNumber')
      expect(testComponent.invoiceNumber).to.be.a('string')

      done()
    })
  })

  it('should render an iframe', done => {
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
