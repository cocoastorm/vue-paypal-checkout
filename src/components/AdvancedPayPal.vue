<template>
<div :id="id" class="paypal-button"></div>
</template>

<script>
  import shortid from 'shortid'
  import paypal from 'paypal-checkout'

  export default {
    name: 'advanced-paypal',
    data: function () {
      const id = shortid.generate()
      return {
        id
      }
    },
    props: {
      createPayment: {
        type: Function,
        required: true
      },
      executePayment: {
        type: Function,
        required: true
      },
      dev: {
        type: Boolean,
        required: false
      }
    },
    computed: {
      env: function () {
        const env = process.env.NODE_ENV

        if (this.dev) {
          return 'sandbox'
        }

        return (env !== 'production') ? 'sandbox' : 'production'
      }
    },
    methods: {
      PayPalPayment: function () {
        const vue = this
        const method = this.createPayment()

        return method.then((data) => {
          if (data.hasOwnProperty('paymentId')) {
            vue.$emit('paypal-paymentCreated', data)
            return Promise.resolve(data.paymentId)
          } else {
            const err = new Error('no paymentId found')
            return Promise.reject(err)
          }
        }).catch((err) => {
          vue.$emit('paypal-paymentFailed', err)
        })
      }
    },
    mounted: function () {
      const vue = this
      const sandbox = vue.dev

      paypal.Button.render({
        env: vue.env,

        payment: function (resolve, reject) {
          vue.createPayment()
            .then((response) => {
              const data = response.data
              if (sandbox) console.log('The payment was created!')
              vue.$emit('paypal-paymentCreated', data)
              resolve(data.paymentID)
            }, (err) => {
              reject(err)
            })
        },

        // Pass a function to be called when the customer completes the payment
        onAuthorize: function (data) {
          vue.$emit('paypal-paymentCompleted', data)
          vue.executePayment(data.paymentID, data.payerID)
            .then((response) => {
              const data = response.data
              if (sandbox) console.log('The payment was successful!')
              vue.$emit('paypal-paymentSuccess', data)
            }, (err) => {
              console.log('The payment has failed!')
              vue.$emit('paypal-paymentFail', err)
            })
        },

        // Pass a function to be called when the customer cancels the payment
        onCancel: function (data) {
          if (sandbox) console.log('The payment was cancelled!')
          vue.$emit('paypal-paymentCancelled', data)
        }
      }, vue.id)
    }
  }
</script>
