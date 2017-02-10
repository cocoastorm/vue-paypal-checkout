<template>
<div id="paypal"></div>
</template>

<script>
  import paypal from 'paypal-checkout'

  export default {
    name: 'advancedpaypal',
    props: {
      methods: {
        type: Object,
        required: true
      }
    },
    mounted: function () {
      const vue = this
      paypal.Button.render({
        payment: function (resolve, reject) {
          vue.methods.createPayment()
            .then((response) => {
              const data = response.data
              console.log('The payment was created!');
              vue.$emit('paypal-paymentCreated', data)
              resolve(data.paymentID)
            }, (err) => {
              reject(err)
            })
        },

        // Pass a function to be called when the customer completes the payment
        onAuthorize: function(data) {
          vue.$emit('paypal-paymentCompleted', data)
          vue.methods.executePayment(data.paymentID, data.payerID)
            .then((response) => {
              const data = response.data
              console.log('The payment was successful!');
              vue.$emit('paypal-paymentSuccess', data)
            }, (err) => {
              console.log('The payment has failed!');
              vue.$emit('paypal-paymentFail', err)
            })
        },

        // Pass a function to be called when the customer cancels the payment
        onCancel: function(data) {
            console.log('The payment was cancelled!');
            vue.$emit('paypal-paymentCancelled', data)
        }
      }, '#paypal')
    }
  }
</script>