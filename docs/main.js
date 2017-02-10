import Vue from 'vue'
import App from './App.vue'

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

new Vue({
  el: '#app',
  render: h => h(App)
})
