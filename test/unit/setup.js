import Vue from 'vue';

Vue.config.productionTip = false;

global.jsdom.reconfigure({
  url: 'http://localhost',
});
