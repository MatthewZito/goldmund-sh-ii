import Vue from 'vue';

import { library } from '@fontawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fontawesome/vue-fontawesome';
import { faInstagram } from '@fontawesome/free-brands-svg-icons/faInstagram';
import { faYoutube } from '@fontawesome/free-brands-svg-icons/faYoutube';
import { faGithub } from '@fontawesome/free-brands-svg-icons/faGithub';
import { faShareAltSquare } from '@fontawesome/free-solid-svg-icons/faShareAltSquare';
import { faShareAlt } from '@fontawesome/free-solid-svg-icons/faShareAlt';

export default (function () {
  library.add(
    faInstagram,
    faYoutube,
    faGithub,
    faShareAltSquare,
    faShareAlt
  );

  Vue.component('font-awesome-icon', FontAwesomeIcon);
})();
