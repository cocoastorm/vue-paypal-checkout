<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <h1>{{ msg }}</h1>
    <h2>PayPal (Simple)</h2>
    <SimplePayPal
    amount="10.00"
    currency="USD"
    :client="paypal">
    </SimplePayPal>
    
    <h2>PayPal Resources</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Vue Docs</a></li>
      <li><a href="https://github.com/paypal/paypal-checkout" target="_blank">PayPal</a></li>
      <li><a href="https://github.com/paypal/paypal-checkout/blob/master/docs/button.md" target="_blank">Checkout Button</a></li>
      <li><a href="https://github.com/paypal/paypal-checkout/blob/master/docs/paypal-rest-api.md" target="_blank">Rest API</a></li>
    </ul>
  </div>
</template>

<script>
import SimplePayPal from '../../src/PayPal/SimplePayPal.vue'
import credentials from '../config/paypal.json'

export default {
  name: 'app',
  data () {
    return {
      msg: 'PayPal Vue Components'
    }
  },
  computed: {
    paypal: function () {
      if (credentials) {
        credentials.env = process.env.NODE_ENV
        return credentials
      } else {
        return null
      }
    }
  },
  components: {
    SimplePayPal
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#paypal {
  display: block;
  max-width: 150px;
  margin: 0 auto;
}
</style>
