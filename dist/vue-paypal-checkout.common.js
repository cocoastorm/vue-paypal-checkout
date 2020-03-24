'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _slicedToArray = _interopDefault(require('babel-runtime/helpers/slicedToArray'));
var _Object$assign = _interopDefault(require('babel-runtime/core-js/object/assign'));
var paypal = _interopDefault(require('paypal-checkout'));
var _Object$keys = _interopDefault(require('babel-runtime/core-js/object/keys'));

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
}, {
  name: 'client',
  type: Object,
  required: true
}, {
  name: 'details',
  type: Object,
  required: false,
  default: function _default() {
    return {};
  }
}, {
  name: 'commit',
  type: Boolean,
  required: false,
  default: true
}];

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

  props['send-paypal-actions'] = { type: Function, required: false, default: undefined };

  return props;
}

function paypalProp(prop) {
  /* eslint-disable no-param-reassign */
  var define = function getDefine(object) {
    return function def(name, param, defaultParam) {
      var isDefined = typeof param !== 'undefined' && param !== null;
      var hasDefault = typeof defaultParam !== 'undefined' && defaultParam !== null;

      if (isDefined) object[name] = param;else if (hasDefault) object[name] = defaultParam;else object[name] = undefined; // TODO: throw err?
    };
  }(this);

  define('name', prop.name);
  define('propName', prop.paypalName, prop.name);
  define('injection', prop.injection, 'button');
  define('type', prop.type, Object);
  define('required', prop.required, false);
  define('validator', prop.validator, undefined);

  this.transforms = [];
}

paypalProp.prototype.getVmProp = function getVmProp() {
  return {
    type: this.type,
    required: this.required,
    validator: this.validator
  };
};

paypalProp.prototype.addChangeTransform = function addChangeTransform(callable) {
  this.transforms.push(callable);
};

paypalProp.prototype.getChange = function getChange(src) {
  var value = src[this.name];

  // change the value if necessary...
  if (value !== undefined && value !== null) {
    this.transforms.forEach(function (transform) {
      value = transform(value);
    });
  }

  return {
    name: this.propName,
    value: value
  };
};

var propTypes = {
  BUTTON: 'button',
  PAYMENT: 'payment',
  TRANSACTION: 'transaction'
};

function assignToPropertyObject(props) {
  return function assignTo(vm, type) {
    var obj = {};

    props.getTypedProps(type).forEach(function (item) {
      var _item$getChange = item.getChange(vm),
          name = _item$getChange.name,
          value = _item$getChange.value;

      if (name !== undefined && value !== undefined) {
        obj[name] = value;
      }
    });

    return obj;
  };
}

// TODO: add item validator
var itemsPayPalProp = new paypalProp({
  name: 'items',
  paypalName: 'item_list',
  type: Array,
  injection: propTypes.TRANSACTION
});

itemsPayPalProp.addChangeTransform(function (items) {
  return { items: items };
});

var shippingAddressProp = new paypalProp({
  name: 'shippingAddress',
  paypalName: 'shipping_address',
  type: Object,
  injection: propTypes.TRANSACTION
});

var props = [
// Button Props
new paypalProp({ name: 'buttonStyle', paypalName: 'style', injection: propTypes.BUTTON }), new paypalProp({ name: 'braintree', injection: propTypes.BUTTON }), new paypalProp({ name: 'locale', type: String, injection: propTypes.BUTTON }),

// Payment Props
new paypalProp({ name: 'experience', injection: propTypes.PAYMENT }),

// Transaction Props
new paypalProp({
  name: 'invoiceNumber',
  paypalName: 'invoice_number',
  type: String,
  injection: propTypes.TRANSACTION
}), new paypalProp({
  name: 'notifyUrl',
  paypalName: 'notify_url',
  type: String,
  validator: function validator(value) {
    return (/^https?:\/\//.test(value)
    );
  },
  injection: propTypes.TRANSACTION
}), itemsPayPalProp, shippingAddressProp];

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

var assignTo = assignToPropertyObject(additionalProps);

var script = {
  props: _Object$assign(defaultProps(), additionalProps.vmProps()),
  methods: {
    validate: function validate(actions) {
      this.$emit('send-paypal-actions', actions);
    },
    payment: function payment() {
      var vue = this;

      var transaction = _Object$assign({
        amount: {
          total: this.amount,
          currency: this.currency,
          details: this.details
        }
      }, assignTo(vue, propTypes.TRANSACTION));

      // TODO: clean this up
      if (transaction.shipping_address && transaction.item_list) {
        transaction.item_list.shipping_address = transaction.shipping_address;
        delete transaction.shipping_address;
      }

      var payment = {
        transactions: [transaction]
      };

      return paypal.rest.payment.create(this.env, this.client, _Object$assign({ payment: payment }, assignTo(vue, propTypes.PAYMENT)));
    },
    onAuthorize: function onAuthorize(data, actions) {
      var vue = this;
      vue.$emit('payment-authorized', data);

      if (this.commit) {
        return actions.payment.execute().then(function (response) {
          vue.$emit('payment-completed', response);
        });
      }

      return true;
    },
    onCancel: function onCancel(data) {
      var vue = this;
      vue.$emit('payment-cancelled', data);
    }
  },
  mounted: function mounted() {
    var vue = this;
    var button = _Object$assign({
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

      // Pass a function to be called when the page load
      validate: vue.validate
    }, assignTo(vue, propTypes.BUTTON));

    paypal.Button.render(button, vue.$el);
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "paypal-button", attrs: { id: _vm.id } });
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

/* style */
var __vue_inject_styles__ = undefined;
/* scoped */
var __vue_scope_id__ = undefined;
/* module identifier */
var __vue_module_identifier__ = undefined;
/* functional template */
var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

var PayPalCheckout = normalizeComponent_1({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

var components = {
  'paypal-checkout': PayPalCheckout
};

_Object$keys(components).forEach(function (name) {
  // in browsers ~
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component(name, components[name]);
  }
});

module.exports = PayPalCheckout;
