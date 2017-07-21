import PayPalCheckout from '@/components/PayPalCheckout'
// import AdvancedPayPal from '@/components/AdvancedPayPal'

const components = {
  'paypal-checkout': PayPalCheckout,
  // 'AdvancedPayPal': AdvancedPayPal
}

Object.keys(components).forEach((name) => {
  // in browsers ~
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component(name, components[name])
  }
})

export default PayPalCheckout
