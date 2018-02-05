<template>
  <div :id="id" class="paypal-button"></div>
</template>

<script>
import paypal from 'paypal-checkout';
import defaultProps from '../util/defaultProps';
import { propTypes } from '../util/paypalProp';
import additionalProps from '../additionalProps';

export default {
  props: Object.assign(
    defaultProps(),
    additionalProps.vmProps(),
  ),
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
    payment() {
      const payment = {
        transactions: [{
          amount: {
            total: this.amount,
            currency: this.currency,
          },
          invoice_number: (typeof this.invoiceNumber !== 'undefined')
            ? this.invoiceNumber
            : undefined,
          item_list: (typeof this.items !== 'undefined')
            ? this.item_list()
            : undefined,
        }],
        experience: (typeof this.experience !== 'undefined')
          ? this.experience
          : undefined,
      };

      return paypal.rest.payment.create(this.env, this.client, payment);
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

    additionalProps.getTypedProps(propTypes.BUTTON).forEach((prop) => {
      const result = prop.getChange(vue);

      if (result !== undefined) {
        const { name, value } = result;
        button[name] = value;
      }
    });

    paypal.Button.render(button, vue.$el);
  },
};
</script>
