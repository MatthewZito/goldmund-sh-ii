import config from '@config';

const { title, version, settings, logger } = config;

const state = {
  title,
  version,
  settings,
  logger,
  drawerState: false,
  viewCache: []
};

export default state;
