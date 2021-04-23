<script>
export default {
  name: 'Information'
};
</script>

<template>
  <div class="row">
    <div class="col-xs-12 col-md-6">
      <img
        class="img-responsive"
        style="marginTop:30px;"
        alt="A picture of the site admin"
        src="@/assets/headshot.jpg"
      />
      <p>
        Goldmund.sh author and administrator
      </p>

      <hr />
      <div>
        <router-link
          to="/communications"
          tag="button"
          class="btn btn-primary"
        >
          Communicate
        </router-link>
      </div>
    </div>
  </div>
</template>
