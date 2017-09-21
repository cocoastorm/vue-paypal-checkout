<template>
<div :id="id" class="paypal-button"></div>
</template>

<script>
  import shortid from 'shortid';
  import paypal from 'paypal-checkout';

  function isValid(item, options) {
    return options.some(v => (v === item));
  }

  function validateButtonStyle(source) {
    const copy = Object.assign({}, source);
    const options = {
      size: ['tiny', 'small', 'medium', 'responsive'],
      color: ['gold', 'blue', 'silver'],
      shape: ['pill', 'rect'],
    };

    Object.keys(options).forEach((key) => {
      const item = copy[key];
      const valid = isValid(item, options[key]);

      if (!valid) {
        console.warn(`style.${key} = '${item}' isn't a valid option`, options[key]);
        return false;
      }

      return true;
    });

    return true;
  }

  export default {
    name: 'simple-paypal',
    data() {
      return {
        id: shortid.generate(),
      };
    },
    props: {
      amount: {
        type: String,
        required: true,
      },
      client: {
        type: Object,
        required: true,
      },
      commit: {
        type: Boolean,
        required: false,
        default: true,
      },
      currency: {
        type: String,
        required: false,
        default: 'USD',
      },
      dev: {
        type: Boolean,
        required: false,
      },
      invoiceNumber: {
        type: String,
        required: false,
      },
      items: {
        type: Array,
        required: false,
      },
      buttonStyle: {
        type: Object,
        required: false,
        validator: validateButtonStyle,
      },
    },
    computed: {
      env() {
        const env = process.env.NODE_ENV;

        if (this.dev) {
          return 'sandbox';
        }

        return (env !== 'production') ? 'sandbox' : 'production';
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
