import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import paypal from 'paypal-checkout';
import _Object$keys from 'babel-runtime/core-js/object/keys';

var requiredProps = [['amount'], ['currency', 'USD']];

var optionalProps = [['id'], ['invoiceNumber']];

var specificProps = [{
  name: 'env',
  type: String,
  required: false,
  default: 'production',
  validator: function validator(value) {
    return ['sandbox', 'production'].indexOf(value) !== -1;
  }
}, { name: 'client', type: Object, required: true },
// eslint-disable-next-line
{ name: 'commit', type: Boolean, required: false, default: true }, { name: 'items', type: Array, required: false }, { name: 'buttonStyle', type: Object, required: false }, { name: 'experience', type: Object, required: false }];

function defaultProps () {
  var props = {};

  // TODO: make type configurable
  // all required props are type String for now
  requiredProps.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        def = _ref2[1];

    props[name] = {
      type: String,
      required: true,
      default: typeof def !== 'undefined' ? def : undefined
    };
  });

  // TODO: make type configurable
  // all optional props are type String for now
  optionalProps.forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        name = _ref4[0],
        def = _ref4[1];

    props[name] = {
      type: String,
      required: false,
      default: typeof def !== 'undefined' ? def : undefined
    };
  });

  // all specific props are declared ahead of time
  specificProps.forEach(function (prop) {
    props[prop.name] = {
      type: prop.type,
      required: prop.required
    };

    if (prop.default !== undefined) {
      props[prop.name].default = prop.default;
    }
  });

  return props;
}

function paypalProp(prop) {
  this.name = prop.name;

  if (typeof prop.paypalName !== 'undefined') {
    this.propName = prop.paypalName;
  } else {
    this.propName = this.name;
  }

  if (typeof prop.injectionType !== 'undefined') {
    this.injection = prop.injectionType;
  } else {
    this.injection = 'button';
  }
}

paypalProp.prototype.getVmProp = function getVmProp() {
  return {
    type: Object,
    required: false
  };
};

paypalProp.prototype.getChange = function getChange(src) {
  var value = src[this.name];

  if (typeof value !== 'undefined') {
    return {
      name: this.propName,
      value: value
    };
  }

  return undefined;
};

var propTypes = {
  BUTTON: 'button',
  TRANSACTION: 'transaction'
};

var props = [new paypalProp({ name: 'buttonStyle', paypalName: 'style', type: propTypes.BUTTON }), new paypalProp({ name: 'braintree', type: propTypes.BUTTON })];

function vmProps() {
  var vm = {};

  props.forEach(function (prop) {
    vm[prop.name] = prop.getVmProp();
  });

  return vm;
}

function getTypedProps(type) {
  return props.filter(function (prop) {
    return prop.injection === type;
  });
}

var additionalProps = {
  vmProps: vmProps,
  getTypedProps: getTypedProps
};

var PayPalCheckout = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "paypal-button", attrs: { "id": _vm.id } });
  }, staticRenderFns: [],
  props: _Object$assign(defaultProps(), additionalProps.vmProps()),
  methods: {
    item_list: function item_list() {
      var itemList = {
        items: []
      };
      this.items.forEach(function (item) {
        itemList.items.push(item);
      });
      return itemList;
    },
    payment: function payment() {
      var payment = {
        transactions: [{
          amount: {
            total: this.amount,
            currency: this.currency
          },
          invoice_number: typeof this.invoiceNumber !== 'undefined' ? this.invoiceNumber : undefined,
          item_list: typeof this.items !== 'undefined' ? this.item_list() : undefined
        }],
        experience: typeof this.experience !== 'undefined' ? this.experience : undefined
      };

      return paypal.rest.payment.create(this.env, this.client, payment);
    },
    onAuthorize: function onAuthorize(data, actions) {
      var vue = this;
      vue.$emit('paypal-paymentAuthorized', data);
      return actions.payment.execute().then(function (response) {
        vue.$emit('paypal-paymentCompleted', response);
      });
    },
    onCancel: function onCancel(data) {
      var vue = this;
      vue.$emit('paypal-paymentCancelled', data);
    }
  },
  mounted: function mounted() {
    var vue = this;
    var button = {
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
      onCancel: vue.onCancel
    };

    additionalProps.getTypedProps(propTypes.BUTTON).forEach(function (prop) {
      var result = prop.getChange(vue);

      if (result !== undefined) {
        var name = result.name,
            value = result.value;

        button[name] = value;
      }
    });

    paypal.Button.render(button, vue.$el);
  }
};

var components = {
  'paypal-checkout': PayPalCheckout
};

_Object$keys(components).forEach(function (name) {
  // in browsers ~
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component(name, components[name]);
  }
});

export default PayPalCheckout;
