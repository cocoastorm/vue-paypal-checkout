import SimplePayPal from '@/components/SimplePayPal'
import AdvancedPayPal from '@/components/AdvancedPayPal'

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
