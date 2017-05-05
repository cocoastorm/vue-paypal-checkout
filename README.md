# vue-paypal-checkout

> A simple Vue.js wrapper component for paypal-checkout

[![Travis](https://img.shields.io/travis/rust-lang/rust.svg)](https://travis-ci.org/khoanguyen96/vue-paypal-checkout)

## Usage
include vue-paypal-checkout (main.js):
``` javascript
import Vue from 'vue'
import vuepaypal from 'vue-paypal-checkout'

Vue.use(vuepaypal.default) // or
Vue.use(vuepaypal)
```

### Using the Simple PayPal component:
``` html
<div id="app">
  <paypal-simple amount="10.00" currency="USD" :client="paypal" invoiceNumber="201701011000"></paypal-simple>
</div>
```

``` javascript
<script>
  export default {
    data () {
      return {
        paypal: {
          sandbox: '<sandbox client id>',
          production: '<production client id>'
        }
      }
    }
  }
</script>
```

#### Events fired from the Simple PayPal component:

Each of these events fired also contain a payload which is essentially the response sent back from PayPal.

+ `paypal-paymentCompleted`
+ `paypal-paymentCancelled`

In the instance of `paypal-paymentCompleted`, you will get back an object similar to this:

``` json
{  
  "intent": "sale",
  "payerID": "UVGR8M6W9V7ZA",
  "paymentID": "PAY-3L661344P7749433KLD2R5ZQ",
  "paymentToken": "EC-0H346145A8442392H",
  "returnUrl" :"https://www.sandbox.paypal.com/?paymentId=PAY-3L661344P7749433KLD2R5ZQ&token=EC-0H346145A8442392H&PayerID=UVGR8M6W9V7ZA"
}
```

### Using the Advanced PayPal component:
``` html
<div id="app">
  <paypal-advanced :methods="paypal"></paypal-advanced>
</div>
```

``` javascript
<script>
  export default {
    data () {
      return {
        paypal: {
          createPayment: function () {
            // call to your api to create PayPal payment
          },
          executePayment: function () {
            // call to your api to execute PayPal payment
          }
        }
      }
    }
  }
</script>
```

## Specifying the environment
You can specifically pass a prop `dev` which accepts a Boolean if you need to explicitly use the sandbox version of the PayPal Checkout Button. However, if this prop is false or hasn't been set, the component will fallback to `process.env.NODE_ENV` instead.

``` html
<div id="app">
  <paypal-simple amount="10.00" currency="USD" :client="paypal" :dev="true"></paypal-simple>
</div>
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## License and Reference
vue-paypal-checkout is available under the [MIT license](http://opensource.org/licenses/MIT).
For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
