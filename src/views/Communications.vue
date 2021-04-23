<script>
export default {
  name: 'Communications'
};
</script>

<template>
  <div class="row">
    <div class="main-form">
      <div class="container__section-spacer">
        <h1>
          Communications
        </h1>
      </div>
      <div class="container__section-spacer">
        <form>
          <div class="row">
            <div class="main-form main-form__offset">
              <p>
                Should you wish to communicate, this is the best means to do so. PGP correspondence is welcome and furthermore encouraged.
                To this end, find below my self-signed GPG public key and accompanying fingerprint for validation.
              </p>
              <div class="form-group">
                <label htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  required
                  type="email"
                  name="email"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label htmlFor="subject">
                  Subject
                </label>
                <input
                  id="subject"
                  required
                  type="text"
                  name="subject"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label htmlFor="content">
                  Message
                </label>
                <textarea
                  id="content"
                  required type="text"
                  name="content"
                  class="form-control"
                  rows="3"
                  placeholder="Enter your message"
                />
              </div>
              <button
                aria-label="submit form"
                type="submit"
                class="btn btn-primary btn-lg"
              >
                Send
              </button>
            </div>

            <div
              class="main-form main-.main-form__offset"
              style="marginLeft:-15px"
            >
              <ul class="main-list__unstyled">
                <li>
                  <span class="fa-icon">
                    <i
                      class="fas fa-key"
                      aria-hidden="true"
                    />
                  </span>
                  <router-link to="/pubkey">
                    public key
                  </router-link>
                </li>
                <li>
                  <span class="fa-icon">
                    <i
                      class="fas fa-fingerprint"
                      aria-hidden="true"
                    />
                  </span>
                    306E 7D6A 359E 3448 F2F4  F85A 204C 907B 2280 7B5B
                </li>
              </ul>
            </div>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<style scoped>
.main-list__unstyled {
  padding-left: 0;
  list-style: none;
}

.main-form {
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
}

@media (min-width: 992px) {
  .main-form__offset {
    float: left;
    width: 50%;
  }
}
</style>
