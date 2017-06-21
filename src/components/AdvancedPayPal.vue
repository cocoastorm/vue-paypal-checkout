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
        required: false
      },
      executePayment: {
        type: Function,
        required: false
      },
      dev: {
        type: Boolean,
        required: false,
        default: process.env.NODE_ENV !== 'production'
      }
    },
    mounted: function () {
      const vue = this
      const sandbox = vue.dev

      paypal.Button.render({
        env: (sandbox) ? 'sandbox' : 'production',

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
