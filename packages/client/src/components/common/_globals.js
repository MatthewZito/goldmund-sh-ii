import Vue from 'vue';

const req = require.context(
  '.',
  false,
  /_base-[\w-]+\.vue$/
);

req
  .keys()
  .forEach(file => {
    const componentConf = req(file);
    const componentName = file
      .replace(/^\.\/_/, '')
      .replace(/\.\w+$/, '')
      .split('-')
      .map(kebab => kebab.charAt(0).toUpperCase() + kebab.slice(1))
      .join('');

    Vue.component(
      componentName,
      componentConf.default || componentConf
    );
});
