import Vue from 'vue'
import SimplePayPal from 'src/PayPal/SimplePayPal'

const credentials = {
  sandbox: 'AWi18rxt26-hrueMoPZ0tpGEOJnNT4QkiMQst9pYgaQNAfS1FLFxkxQuiaqRBj1vV5PmgHX_jA_c1ncL',
  production: 'AVZhosFzrnZ5Mf3tiOxAD0M6NHv8pcB2IFNHAfp_h69mmbd-LElFYkJUSII3Y0FPbm7S7lxBuqWImLbl'
}

let getComponentWithProps = function (Component, propsData) {
  const Ctor = Vue.extend(Component)
  return new Ctor({ propsData }).$mount()
}

describe('SimplePayPal.vue', () => {
  it('should have the correct props', () => {
    const simple = getComponentWithProps(SimplePayPal, {
      amount: '1.00',
      client: credentials,
      currency: 'USD',
      commit: true
    })

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

    expect(simple).to.have.property('development')
    expect(simple.development).to.be.a('boolean')
  })

  it('should render an iframe', () => {
    const vm = getComponentWithProps(SimplePayPal, {
      amount: '1.00',
      client: credentials,
      currency: 'USD',
      commit: true
    })

    // test mounted div
    const mount = vm
    expect(mount.$el.textContent).to.eql('')
    expect(mount.$el.tagName).to.eql('DIV')
    expect(mount.$el.querySelector('.xcomponent-show-component'))
  })
})
