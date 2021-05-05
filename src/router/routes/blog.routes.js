import routes from 'virtual:generated-pages';

export default routes.map(conf => ({ ...conf, meta: { ...conf.meta, label: 'cat' } }));
