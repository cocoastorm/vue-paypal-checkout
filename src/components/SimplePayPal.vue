<template>
<div :id="id" class="paypal-button"></div>
</template>

<script>
  import shortid from 'shortid'
  import paypal from 'paypal-checkout'

  export default {
    name: 'simple-paypal',
    data: function () {
      return {
        id: shortid.generate()
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
        required: false
      },
      invoiceNumber: {
        type: String,
        required: false,
        default: null
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
        let transaction = {
          amount: {
            total: this.amount,
            currency: this.currency
          }
        }

        if (this.invoiceNumber !== null) {
          transaction = Object.assign({}, transaction, { 'invoice_number': this.invoiceNumber })
        }

        return paypal.rest.payment.create(this.env, this.client, {
          transactions: [ transaction ]
        })
      },
      onAuthorize: function (data, actions) {
        const vue = this
        return actions.payment.execute().then(() => {
          vue.$emit('paypal-paymentCompleted', data)
        })
      },
      onCancel: function (data) {
        const vue = this
        vue.$emit('paypal-paymentCancelled', data)
      }
    },
    mounted: function () {
      const vue = this
      paypal.Button.render({
        // Pass in env
        env: vue.env,

        // Pass in the client ids to use to create your transaction on sandbox and production environments
        client: vue.client,

        // Pass the payment details for your transaction
        // See https://developer.paypal.com/docs/api/payments/#payment_create for the expected json parameters
        payment: vue.PayPalPayment,

        // Display a "Pay Now" button rather than a "Continue" button
        commit: vue.commit,

        // Pass a function to be called when the customer completes the payment
        onAuthorize: vue.onAuthorize,

        // Pass a function to be called when the customer cancels the payment
        onCancel: vue.onCancel
      }, vue.id)
    }
  }
</script>
