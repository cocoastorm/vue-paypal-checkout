<template>
<div id="paypal"></div>
</template>

<script>
  import paypal from 'paypal-checkout'

  export default {
    props: {
      methods: {
        type: Object,
        required: true
      }
    },
    mounted: function () {
      const vm = this
      paypal.Button.render({
        payment: function (resolve, reject) {
          vm.methods.createPayment()
            .then((response) => {
              const data = response.data
              console.log('The payment was created!');
              vm.$emit('paypal-paymentCreated', data)
              resolve(data.paymentID)
            }, (err) => {
              reject(err)
            })
        },

        // Pass a function to be called when the customer completes the payment
        onAuthorize: function(data) {
          vm.$emit('paypal-paymentCompleted', data)
          vm.methods.executePayment(data.paymentID, data.payerID)
            .then((response) => {
              const data = response.data
              console.log('The payment was successful!');
              vm.$emit('paypal-paymentSuccess', data)
            }, (err) => {
              console.log('The payment has failed!');
              vm.$emit('paypal-paymentFail', err)
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