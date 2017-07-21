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
      commit: {
        type: Boolean,
        required: false,
        default: true
      },
      currency: {
        type: String,
        required: false,
        default: 'USD'
      },
      dev: {
        type: Boolean,
        required: false
      },
      invoiceNumber: {
        type: String,
        required: false
      },
      items: {
        type: Array,
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
      item_list: function () {
        let item_list = {
          items: []
        }

        this.items.forEach((item) => {
          item_list.items.push(item)
        })

        return item_list
      },
      PayPalPayment: function () {
        let transaction = {
          amount: {
            total: this.amount,
            currency: this.currency
          }
        }

        if (this.invoiceNumber !== undefined) {
          transaction.invoice_number = this.invoiceNumber
        }

        if (this.items !== undefined) {
          transaction.item_list = this.item_list()
        }

        return paypal.rest.payment.create(this.env, this.client, {
          transactions: [ transaction ]
        })
      },
      onAuthorize: function (data, actions) {
        const vue = this
        vue.$emit('paypal-paymentAuthorized', data)
        return actions.payment.execute().then((response) => {
          vue.$emit('paypal-paymentCompleted', response)
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
