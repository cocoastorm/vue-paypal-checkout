# vue-paypal-checkout

> A simple Vue.js wrapper component for `paypal-checkout`

[![Travis](https://img.shields.io/travis/khoanguyen96/vue-paypal-checkout.svg)](https://travis-ci.org/khoanguyen96/vue-paypal-checkout)
[![npm](https://img.shields.io/npm/v/vue-paypal-checkout.svg)](https://www.npmjs.com/package/vue-paypal-checkout)
[![David](https://img.shields.io/david/khoanguyen96/vue-paypal-checkout.svg)](https://david-dm.org/khoanguyen96/vue-paypal-checkout)

## Usage with Vue itself
Simply include Vue and `vue-paypal-checkout` into your html file (using unpkg cdn)

``` html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-paypal-checkout@2.0.0/dist/vue-paypal-checkout.min.js"></script>
```

By including vue-paypal-checkout in a script tag, it will automagically register the component into Vue
``` html
<div id="app">
  <paypal-checkout
    amount="10.00"
    currency="USD"
    :client="paypal"
    invoiceNumber="201701011000">
  </paypal-checkout>
</div>
```

## Usage with Vue Loader
Simply import the package into your .vue file.

``` javascript
import PayPal from 'vue-paypal-checkout'

...
components: {
  PayPal
}
```

### Using the PayPal component:
``` html
 <PayPal
  amount="10.00"
  currency="USD"
  :client="credentials"
  invoiceNumber="201701011000">
</PayPal>
```

``` javascript
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
  invoiceNumber="201701011000"
  :items="myItems">
</PayPal>
```

``` javascript
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


#### Events fired by the Simple PayPal component:

Each of these events fired also contain a payload which is essentially the response sent back from PayPal.

+ `paypal-paymentAuthorized`
+ `paypal-paymentCompleted`
+ `paypal-paymentCancelled`

In the instance of `paypal-paymentAuthorized`, you will get back a response object similar to this:

``` json
{  
  "intent": "sale",
  "payerID": "UVGR8M6W9V7ZA",
  "paymentID": "PAY-3L661344P7749433KLD2R5ZQ",
  "paymentToken": "EC-0H346145A8442392H",
  "returnUrl" :"https://www.sandbox.paypal.com/?paymentId=PAY-3L661344P7749433KLD2R5ZQ&token=EC-0H346145A8442392H&PayerID=UVGR8M6W9V7ZA"
}
```

In the instance of `paypal-paymentCompleted`, you will get back a response object similar to this:

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

## Specifying the environment
You can specifically pass a prop `dev` which accepts a Boolean if you need to explicitly use the sandbox version of the PayPal Checkout Button. However, if this prop is false or hasn't been set, the component will fallback to `process.env.NODE_ENV` instead.

``` html
<div id="app">
  <paypal-checkout amount="10.00" currency="USD" :client="paypal" :dev="true"></paypal-checkout>
</div>
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# run unit tests
npm run test

# build for production with minification
npm run build
```

## License and Reference
vue-paypal-checkout is available under the [MIT license](http://opensource.org/licenses/MIT).
vue-paypal-checkout is a wrapper Vue component that uses `paypal-checkout` which is under the [Apache 2.0 License](https://opensource.org/licenses/Apache-2.0)

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
