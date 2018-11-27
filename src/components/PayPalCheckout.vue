<template>
  <div :id="id" class="paypal-button"></div>
</template>

<script>
import paypal from 'paypal-checkout';
import defaultProps from '../util/defaultProps';
import additionalProps from '../util/additionalProps';
import { propTypes, assignToPropertyObject } from '../util/paypalProp';

const assignTo = assignToPropertyObject(additionalProps);

export default {
  props: Object.assign(
    defaultProps(),
    additionalProps.vmProps(),
  ),
  methods: {
    payment() {
      const vue = this;

      const transaction = Object.assign({
        amount: {
          total: this.amount,
          currency: this.currency,
          details: this.details,
        },
      }, assignTo(vue, propTypes.TRANSACTION));

      // TODO: clean this up
      if (transaction.shipping_address && transaction.item_list) {
        transaction.item_list.shipping_address = transaction.shipping_address;
        delete transaction.shipping_address;
      }

      const payment = {
        transactions: [transaction],
      };

      return paypal.rest.payment.create(
        this.env,
        this.client,
        Object.assign({ payment }, assignTo(vue, propTypes.PAYMENT)),
      );
    },
    onAuthorize(data, actions) {
      const vue = this;
      vue.$emit('payment-authorized', data);

      if (this.commit) {
        return actions.payment.execute().then((response) => {
          vue.$emit('payment-completed', response);
        });
      }

      return true;
    },
    onCancel(data) {
      const vue = this;
      vue.$emit('payment-cancelled', data);
    },
  },
  mounted() {
    const vue = this;
    const button = Object.assign({
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
    }, assignTo(vue, propTypes.BUTTON));

    paypal.Button.render(button, vue.$el);
  },
};
</script>
