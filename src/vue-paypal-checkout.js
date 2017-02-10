import SimplePayPal from './PayPal/SimplePaypal'
import AdvancedPayPal from './PayPal/AdvancedPayPal'

export const components = {
  'paypal-simple': SimplePayPal,
  'paypal-advanced': AdvancedPayPal
}

export default {
  install (Vue) {
    Object.keys(components).forEach((name) => {
      Vue.component(name, components[name])
    })
  }
}
