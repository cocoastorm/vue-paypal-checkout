import Vue from 'vue'

import credentials from 'docs/config/paypal.json'
import SimplePayPal from 'src/components/SimplePayPal'

let getComponentWithProps = function (Component, propsData) {
  const Ctor = Vue.extend(Component)
  return new Ctor({ propsData }).$mount()
}

describe('SimplePayPal.vue', () => {
  it('should have the correct props', () => {
    const simple = getComponentWithProps(SimplePayPal, {
      amount: '10.00',
      client: credentials,
      currency: 'USD',
      commit: true
    })

    expect(simple).to.have.property('amount')
    expect(simple.amount).to.be.a('string')
    expect(simple.amount).to.equal('10.00')

    expect(simple).to.have.property('client')
    expect(simple.client).to.be.a('object')
    expect(simple.client).to.have.property('live')
    expect(simple.client.live).to.be.a('string')
    expect(simple.client.live).to.have.length.above(5)
    expect(simple.client).to.have.property('sandbox')
    expect(simple.client.sandbox).to.be.a('string')
    expect(simple.client.sandbox).to.have.length.above(5)

    expect(simple).to.have.property('currency')
    expect(simple.currency).to.be.a('string')
    expect(simple.currency).to.have.length.within(2, 5)

    expect(simple).to.have.property('commit')
    expect(simple.commit).to.be.a('boolean')
  })
})
