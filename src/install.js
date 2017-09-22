import each from 'lodash/each';
import components from './main';

each(components, (component, name) => {
  // eslint-disable-next-line
  Vue.component(name, component);
});
