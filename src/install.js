import each from 'lodash/each';
import components from './main';

each(components, (component, name) => {
  Vue.component(name, component);
});
