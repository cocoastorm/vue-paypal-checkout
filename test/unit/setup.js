import Vue from 'vue';

Vue.config.productionTip = false;

// polyfill matchMedia
window.matchMedia = window.matchMedia ||
  (() => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }));
