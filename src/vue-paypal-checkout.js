import SimplePaypal from './PayPal/SimplePaypal'
import AdvancedPayPal from './PayPal/AdvancedPayPal'

export const components = {
  SimplePaypal,
  AdvancedPayPal
}

export default {
  install (Vue) {
    Object.keys(components).forEach((name) => {
      Vue.component(name, components[name])
    })
  }
}

export {
  SimplePaypal,
  AdvancedPayPal
}
