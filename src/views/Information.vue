<script>
export default {
  name: 'Information'
};
</script>

<template>
  <div class="row">
    <div class="col-main col-main__offset col-main__right">
      <img
        class="img-responsive"
        style="marginTop:30px;"
        alt="A picture of the site admin"
        src="@/assets/headshot.jpg"
      />
      <p>
        Goldmund.sh author and administrator
      </p>
    </div>
    <div class="col-main col-main__offset col-main__right">
      <hr />
      <p>
        Welcome to Goldmund.sh. This website is an entrypoint to an experimental web application that was designed to inquiry
        the nature of automation as it pertains to user-curated content. My name is +goldmund; I am an artist and computer scientist. I admire greatly elegant
        system architectures; whether such architectures comprise software or humans is of negligible consequence to what is a rather unbridled interest anyway.
      </p>

      <p>
        As someone who inhabits a markedly obsessive-compulsive framework, I have&mdash;for the greater duration of my life&mdash;taken to archiving and documenting
        the topological graph that is my meandering outputs. Even prior to my foray into computer science, I comprised at the age of 14 the aptly and eponymously named
        "Lexicon", intended to be a corpus of my various efforts, and coordinated as a comprehensive archive across several mediums.
      </p>

      <p>
        I have until now&mdash;some fifteen years subsequent&mdash;held archive of Lex via hand, an endeavor that has left me with copious 'loose leafs' and tattered journals
        to which they once (presumably) belonged. Now, I have decided to better archive this media. So yes, in short, you're looking at a glorified blog. But this site is also so very much more than that...
      </p>

      <div>
        <router-link
          to="/communications"
           v-slot="{ navigate }"
        >
          <button
            class="btn btn-primary"
            @click="navigate"
          >
            Communicate
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.col-main {
  width: 100%;
}

.col-main__offset {
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
}

@media (min-width: 992px) {
  .col-main__right {
    float: left;
    width: 50%;
  }
}
</style>
