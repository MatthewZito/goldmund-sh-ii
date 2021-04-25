import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faShareAltSquare } from '@fortawesome/free-solid-svg-icons/faShareAltSquare';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons/faShareAlt';

export default function () {
  library.add(
    faInstagram,
    faYoutube,
    faGithub,
    faShareAltSquare,
    faShareAlt
  );

  return FontAwesomeIcon;
}
