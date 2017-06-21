import SimplePayPal from '@/components/SimplePayPal'
import AdvancedPayPal from '@/components/AdvancedPayPal'

const components = {
  'paypal-simple': SimplePayPal,
  'paypal-advanced': AdvancedPayPal
}

Object.keys(components).forEach((name) => {
  // in browsers ~
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component(name, components[name])
  }
})

export { SimplePayPal, AdvancedPayPal }

export default SimplePayPal
