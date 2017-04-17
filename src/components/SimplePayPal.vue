<template>
<div :id="id" class="paypal-button"></div>
</template>

<script>
  import shortid from 'shortid'
  import paypal from 'paypal-checkout'

  export default {
    data: function () {
      const id = shortid.generate()
      const environment = (process.env.NODE_ENV === 'production')
      ? 'production'
      : 'sandbox'
      return {
        id,
        environment
      }
    },
    props: {
      amount: {
        type: String,
        required: true
      },
      client: {
        type: Object,
        required: true
      },
      currency: {
        type: String,
        required: false,
        default: 'USD'
      },
      commit: {
        type: Boolean,
        required: false,
        default: true
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
        // Pass in env
        env: (sandbox) ? 'sandbox' : 'production',

        // Pass the client ids to use to create your transaction on sandbox and production environments
        client: vue.client,

        // Pass the payment details for your transaction
        // See https://developer.paypal.com/docs/api/payments/#payment_create for the expected json parameters

        payment: function () {
          return paypal.rest.payment.create(this.props.env, this.props.client, {
            transactions: [
              {
                amount: {
                  total: vue.amount,
                  currency: vue.currency
                }
              }
            ]
          })
        },
        // Display a "Pay Now" button rather than a "Continue" button
        commit: true,

        // Pass a function to be called when the customer completes the payment
        onAuthorize: function (data, actions) {
          return actions.payment.execute().then(function () {
            console.log('The payment was completed!')
            vue.$emit('paypal-paymentCompleted', data)
          })
        },

        // Pass a function to be called when the customer cancels the payment
        onCancel: function (data) {
          console.log('The payment was cancelled!')
          vue.$emit('paypal-paymentCancelled', data)
        }
      }, vue.id)
    }
  }
</script>
