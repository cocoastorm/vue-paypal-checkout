<template>
<div id="paypal"></div>
</template>

<script>
  import paypal from 'paypal-checkout'

  export default {
    props: {
      advanced: {
        type: Boolean,
        required: false,
        default: false
      },
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
        default: false
      }
    },
    mounted: function () {
      const vm = this
      
      paypal.Button.render({
        // Pass the client ids to use to create your transaction on sandbox and production environments
        client: vm.client,

        // Pass the payment details for your transaction
        // See https://developer.paypal.com/docs/api/payments/#payment_create for the expected json parameters

        payment: function () {
          return paypal.rest.payment.create('sandbox', this.props.client, {
            transactions: [
              {
                amount: {
                  total: vm.amount,
                  currency: vm.currency
                }
              }
            ]
          })
        },
        // Display a "Pay Now" button rather than a "Continue" button
        commit: vm.commit,

        // Pass a function to be called when the customer completes the payment
        onAuthorize: function(data, actions) {
          return actions.payment.execute().then(function() {
              console.log('The payment was completed!');
              vm.$emit('paypal-paymentCompleted', data)
          })
        },

        // Pass a function to be called when the customer cancels the payment
        onCancel: function(data) {
            console.log('The payment was cancelled!');
            vm.$emit('paypal-paymentCancelled', data)
        }
      }, '#paypal')
    }
  }
</script>