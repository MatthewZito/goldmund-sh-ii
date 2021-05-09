import VueGtag from 'vue-gtag-next';


function ga () {
  this.use(VueGtag, {
    property: {
      id: import.meta.env.VITE_APP_UA
    }
  });
}

export default {
  install (app, opts) {
    ga.apply(app);
  }
};
