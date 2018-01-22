<template>
<div :id="id" class="paypal-button"></div>
</template>

<script>
import paypal from 'paypal-checkout';
import defaultProps from '../util/defaultProps';

export default {
  props: defaultProps(),
  computed: {
    env() {
      return (this.dev) ? 'sandbox' : 'production';
    },
  },
  methods: {
    payment() {
      const transaction = {
        amount: {
          total: this.amount,
          currency: this.currency,
        },
      };

      return paypal.rest.payment.create(this.env, this.client, {
        transactions: [transaction],
      });
    },
    onAuthorize(data, actions) {
      const vue = this;
      vue.$emit('paypal-paymentAuthorized', data);
      return actions.payment.execute().then((response) => {
        vue.$emit('paypal-paymentCompleted', response);
      });
    },
    onCancel(data) {
      const vue = this;
      vue.$emit('paypal-paymentCancelled', data);
    },
  },
  mounted() {
    const vue = this;
    const button = {
      // Pass in env
      env: vue.env,

      // Pass in the client ids to use to create your transaction
      // on sandbox and production environments
      client: vue.client,

      // Pass the payment details for your transaction
      // See https://developer.paypal.com/docs/api/payments/#payment_create for the expected json parameters
      payment: vue.payment,

      // Display a "Pay Now" button rather than a "Continue" button
      commit: vue.commit,

      // Pass a function to be called when the customer completes the payment
      onAuthorize: vue.onAuthorize,

      // Pass a function to be called when the customer cancels the payment
      onCancel: vue.onCancel,
    };

    paypal.Button.render(button, vue.id);
  },
};
</script>
