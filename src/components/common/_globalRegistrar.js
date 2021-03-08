import Vue from 'vue';

/* Automatic Global Component Mappings */
const requireComponent = require.context(
  '.',
  false,
  /_global_[\w-]+\.vue$/
);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);

  const componentName = fileName
    .replace(/^\.\/_global_/, '')
    .replace(/\.\w+$/, '')
    .split('-')
    .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
    .join('');

  Vue.component(componentName, componentConfig.default || componentConfig);
});
