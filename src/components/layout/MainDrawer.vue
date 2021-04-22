<script>
import MainFooter from './MainFooter.vue';

export default {
  name: 'MainDrawer',
  components: {
    MainFooter
  }
};
</script>

<template>
  <div>
    <div class="navbar navbar-default visible-xs">
      <button aria-label="toggle menu" type="button">
        <span class="sr-only">
          Toggle navigation
        </span>
        <span class="icon-bar" />
        <span class="icon-bar" />
        <span class="icon-bar" />
      </button>
      <a class="navbar-brand">
        ./goldmund.sh
      </a>
    </div>
    <div>
      <nav class="sidebar open">
        <div class="navbar-collapse" id="navbar-collapse">
          <div class="site-header hidden-xs">
              <a class="site-brand">
                <img class="img-responsive site-logo" alt="site logo" src="@/assets/main-logo.svg" />
                $ pwd
              </a>
              <p style="color:#555;">
                An archive of visual and literary media
              </p>
          </div>
          <ul class="nav">
            <li>
              <a class="active">
                Vestibule
              </a>
              </li>
            <li>
              <a>
                Info
              </a>
              </li>
            <li>
              <a>
                Comms
              </a>
            </li>
          </ul>
          <MainFooter />
        </div>
      </nav>
    </div>
  </div>
</template>
