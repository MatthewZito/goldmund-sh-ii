// // import config from '@/config';
// /* eslint-disable */
// export default function initSettingsSync (opts) {
//   return function (store) {
//     return settingsSync({ store, opts });
//   }
// }

// function settingsSync ({ store, opts }) {
//   const { namespace, storage } = opts;

//   // get settings from localstorage, if extant sync


//   store.subscribe(({ type, payload }, state) => {
//     if (!type.includes(namespace + '/')) return;
//     // set state to localstorage
//   });
// }
