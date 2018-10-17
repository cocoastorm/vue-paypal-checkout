# vue-paypal-checkout

[![Greenkeeper badge](https://badges.greenkeeper.io/khoanguyen96/vue-paypal-checkout.svg)](https://greenkeeper.io/)

> A simple Vue.js wrapper component for `paypal-checkout`

[![Travis](https://img.shields.io/travis/khoanguyen96/vue-paypal-checkout.svg)](https://travis-ci.org/khoanguyen96/vue-paypal-checkout)
[![npm](https://img.shields.io/npm/v/vue-paypal-checkout.svg)](https://www.npmjs.com/package/vue-paypal-checkout)
[![David](https://img.shields.io/david/khoanguyen96/vue-paypal-checkout.svg)](https://david-dm.org/khoanguyen96/vue-paypal-checkout)

## BREAKING CHANGES
Recently changed [event names](#events-fired-by-the-simple-paypal-component) due to handlers not firing in HTML.

## Usage with Vue itself
Simply include Vue and `vue-paypal-checkout` into your html file (using unpkg cdn)

``` html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-paypal-checkout@2.0.0/dist/vue-paypal-checkout.min.js"></script>
```

By including vue-paypal-checkout in a script tag, it will automagically register the component into Vue.js
``` html
<div id="app">
  <paypal-checkout
    amount="10.00"
    currency="USD"
    :client="paypal">
  </paypal-checkout>
</div>
```

``` html
<script>
var app = new Vue({
  el: '#app',
  data: {
    paypal: {
      sandbox: '<sandbox client id>',
      production: '<production client id>'
    }
  }
})
</script>
```

## Usage with Vue Loader
Simply import the package into your .vue file.

``` javascript
import PayPal from 'vue-paypal-checkout'

export default {
  data() {
    return {
      paypal: {
        sandbox: '<sandbox client id>',
        production: '<production client id>'
      }
    }
  },
  components: {
    PayPal
  }
}
```

### Using the PayPal component:
``` html
 <PayPal
  amount="10.00"
  currency="USD"
  :client="credentials">
</PayPal>
```

``` html
<script>
export default {
  data () {
    return {
      credentials: {
        sandbox: '<sandbox client id>',
        production: '<production client id>'
      }
    }
  }
}
</script>
```

### Specifying the PayPal environment

For testing purposes, just pass in the `env` prop as `sandbox`:
``` html
 <PayPal
  amount="10.00"
  currency="USD"
  :client="credentials"
  env="sandbox">
</PayPal>
```

By default, the environment is for `production`...

Further examples will be using the format for VueJS Single File Components with Vue Loader. There really shouldn't be any major changes required to get it to work in a basic HTML + Vue template.

### Specifying an Invoice Number

You can also specify a specific invoice number if you need so:

``` html
 <PayPal
  amount="10.00"
  currency="USD"
  :client="credentials"
  invoice-number="<some invoice number>">
</PayPal>
```

### Specifying Items
Optionally, according to the PayPal Payments API documents, you can list out any items along with your transaction.

For more information, [PayPal Item List](https://developer.paypal.com/docs/api/payments/#definition-item_list)

**NOTE** 

The items you specify must total up to the be the same amount you specified in the _`amount`_ prop. In this example the items total up to be 10 USD.

### Using the PayPal component:
``` html
 <PayPal
  amount="10.00"
  currency="USD"
  :client="credentials"
  :items="myItems">
</PayPal>
```

``` html
<script>
export default {
  data () {
    return {
      credentials: {
        sandbox: '<sandbox client id>',
        production: '<production client id>'
      },
      myItems: [
        {
          "name": "hat",
          "description": "Brown hat.",
          "quantity": "1",
          "price": "5",
          "currency": "USD"
          },
          {
          "name": "handbag",
          "description": "Black handbag.",
          "quantity": "1",
          "price": "5",
          "currency": "USD"
          }
      ]
    }
  }
}
</script>
```

#### Using PayPal Experience Options (v2.2.0+)

Just pass a valid object with the [Experience options](https://developer.paypal.com/docs/api/payment-experience/) you require in the `experience` prop:

Kudos to @ilrock for mentioning the PayPal Experience options!

``` html
 <PayPal
  amount="10.00"
  currency="USD"
  :client="credentials"
  :experience="experienceOptions">
</PayPal>
```

``` html
<script>
export default {
  data () {
    return {
      credentials: {
        sandbox: '<sandbox client id>',
        production: '<production client id>'
      },
      experienceOptions: {
        input_fields: {
          no_shipping: 1
        }
      }
    }
  }
}
</script>
```

#### Using Braintree SDK (v2.2.0+)

Using Braintree with the PayPal Button is possible as well. Just pass in the Braintree (Web) SDK via the `braintree` prop:

Kudos to @portwatcher for suggesting Braintree support!

``` html
 <PayPal
  amount="10.00"
  currency="USD"
  :client="credentials"
  :braintree="braintreeSdk">
</PayPal>
```

``` html
<script>
export default {
  data () {
    return {
      credentials: {
        sandbox: '<sandbox client id>',
        production: '<production client id>'
      },
      braintreeSdk: window.braintree
    }
  }
}
</script>
```

``` html
<script>
import braintree from 'braintree-web'

export default {
  data () {
    return {
      credentials: {
        sandbox: '<sandbox client id>',
        production: '<production client id>'
      },
      braintreeSdk: braintree
    }
  }
}

</script>
```

## Usage with Nuxt JS
Simply add the script at nuxt.config.js head property

```
export default {
  head: {
    script: [
      { src: 'https://unpkg.com/vue-paypal-checkout@2.0.0/dist/vue-paypal-checkout.min.js' }
    ]
  }
 }
```

By including vue-paypal-checkout in a script tag, it will automagically register the component into Nuxt js

## Usage with Nuxt JS - NPM
```
npm install vue-paypal-checkout
```
create a plugins called paypal.js
``` html
import Vue from 'vue'
import PayPal from 'vue-paypal-checkout'
Vue.component('paypal-checkout', PayPal)
```


in nuxt-config don't forget to add it on plugins, and make sure you disable SSR
``` html
  plugins: [
    { src: '~/plugins/paypal.js', ssr: false }
  ],
</script>
```


and use it like this
``` html
 <no-ssr>
	<paypal-checkout
	env="sandbox"
	amount="10000"
	currency="IDR"
	locale="fr_FR"
	:client="paypal"
	:invoice-number="'201705051001'">
	</paypal-checkout>
</no-ssr>
```

#### Changing Locale (v2.3.3+)
`paypal-checkout` allows changing the locale of the button via a `locale` parameter. There's a `locale` prop you can use to accomplish the same:

``` html
 <PayPal
  amount="10.00"
  currency="USD"
  locale="en_US"
  :client="credentials">
</PayPal>
```

#### Setting UP IPN Notifications (v2.3.5+)
According to the Payments API of PayPal, setting a `notify_url` on the transaction object will allow notifications to be sent to an IPN Listener.

There's a `notify_url` prop you can use to accomplish the same.

``` html
<PayPal
  amount="10.00"
  currency="USD"
  :client="credentials"
  notify-url="<your-ipn-url>">
</PayPal>
```

For more information on implementing IPN, take a look at the [PayPal docs](https://developer.paypal.com/docs/classic/ipn/integration-guide/IPNIntro/).

#### Button Style
`paypal-checkout` allows changing the style of the button via a style object like so:

``` js
{
    label: 'checkout',
    size:  'responsive',    // small | medium | large | responsive
    shape: 'pill',         // pill | rect
    color: 'gold'         // gold | blue | silver | black
}
```

Due to a Vue.js restriction, you'll have to pass it as a `button-style` prop to the component instead if you want to style your PayPal Checkout Button.

``` js
data () {
  myStyle: {
    {
      label: 'checkout',
      size:  'responsive',
      shape: 'pill',
      color: 'gold'
    }
  }
}
```

``` html
 <PayPal
  amount="10.00"
  currency="USD"
  :button-style="myStyle"
  :client="credentials">
</PayPal>
```

#### Events fired by the Simple PayPal component:

Each of these events fired also contain a payload which is essentially the response sent back from PayPal.

v3.0.0+:

+ `payment-authorized`
+ `payment-completed`
+ `payment-cancelled`

v2.3.5 and below:

+ `paypal-paymentAuthorized`
+ `paypal-paymentCompleted`
+ `paypal-paymentCancelled`

In the instance of `payment-authorized` or `paypal-paymentAuthorized` (v2.3.5 and below), you will get back a response object similar to this:

``` json
{  
  "intent": "sale",
  "payerID": "UVGR8M6W9V7ZA",
  "paymentID": "PAY-3L661344P7749433KLD2R5ZQ",
  "paymentToken": "EC-0H346145A8442392H",
  "returnUrl" :"https://www.sandbox.paypal.com/?paymentId=PAY-3L661344P7749433KLD2R5ZQ&token=EC-0H346145A8442392H&PayerID=UVGR8M6W9V7ZA"
}
```

In the instance of `payment-completed` or `paypal-paymentCompleted` (v2.3.5 and below), you will get back a response object similar to this:

[Sample Payment Execute Response](https://developer.paypal.com/docs/integration/direct/payments/paypal-payments/#execute-payment)

``` json
{
  "id": "PAY-4N746561P0587231SKQQK6MY",
  "create_time": "2014-09-22T23:22:27Z",
  "update_time": "2014-09-22T23:31:13Z",
  "state": "approved",
  "intent": "sale",
  "payer": {
    "payment_method": "paypal",
    "payer_info": {
      "email": "npurayil-uspr-60@paypal.com",
      "first_name": "Brian",
      "last_name": "Robinson",
      "payer_id": "JMKDKJ4D7DG7G",
      "shipping_address": {
        "line1": "4thFloor",
        "line2": "unit#34",
        "city": "SAn Jose",
        "state": "CA",
        "postal_code": "95131",
        "country_code": "US",
        "phone": "011862212345678",
        "recipient_name": "HelloWorld"
      }
    }
  }
}
```

## License and Reference
vue-paypal-checkout is available under the [MIT license](http://opensource.org/licenses/MIT).

vue-paypal-checkout is a wrapper Vue component that uses `paypal-checkout` which is under the [Apache 2.0 License](https://opensource.org/licenses/Apache-2.0)

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
