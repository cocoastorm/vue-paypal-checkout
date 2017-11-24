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
    item_list() {
      const itemList = {
        items: [],
      };

      this.items.forEach((item) => {
        itemList.items.push(item);
      });

      return itemList;
    },
    PayPalPayment() {
      const transaction = {
        amount: {
          total: this.amount,
          currency: this.currency,
        },
      };

      if (this.invoiceNumber !== undefined) {
        transaction.invoice_number = this.invoiceNumber;
      }

      if (this.items !== undefined) {
        transaction.item_list = this.item_list();
      }

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

    const buttonObject = {
      // Pass in env
      env: vue.env,

      // Pass in the client ids to use to create your transaction
      // on sandbox and production environments
      client: vue.client,

      // Pass the payment details for your transaction
      // See https://developer.paypal.com/docs/api/payments/#payment_create for the expected json parameters
      payment: vue.PayPalPayment,

      // Display a "Pay Now" button rather than a "Continue" button
      commit: vue.commit,

      // Pass a function to be called when the customer completes the payment
      onAuthorize: vue.onAuthorize,

      // Pass a function to be called when the customer cancels the payment
      onCancel: vue.onCancel,
    };

    // validate style prop
    if (vue.buttonStyle !== undefined) {
      buttonObject.style = vue.buttonStyle;
    }

    paypal.Button.render(buttonObject, vue.id);
  },
};
</script>
