import SimplePayPal from 'src/components/SimplePaypal'
import AdvancedPayPal from 'src/components/AdvancedPayPal'

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
