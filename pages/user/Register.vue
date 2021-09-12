<template>
  <div class="form">
    <form class="form-signin" @submit.prevent="handleRegister">
      <img
        class="mb-4"
        src="/docs/4.3/assets/brand/bootstrap-solid.svg"
        alt=""
        width="72"
        height="72"
      />
      <h1 class="h3 mb-3 font-weight-normal">Please Sign Up</h1>
      <p v-if="validationMessage" class="alert alert-danger">
        {{ validationMessage }}
      </p>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        id="inputEmail"
        v-model="email"
        type="email"
        class="form-control"
        placeholder="Email address"
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        id="inputPassword"
        v-model="password"
        type="password"
        class="form-control"
        placeholder="Password"
      />
      <div class="checkbox mb-3">
        <label>
          <nuxt-link to="/user/login"> Log In </nuxt-link>
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      validationMessage: null,
    }
  },
  methods: {
    handleRegister() {
      this.$axios
        .post(
          'api/auth/signup',
          {
            email: this.email,
            password: this.password,
          },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((res) => {
          this.$axios
            .post(
              'api/auth/login',
              {
                email: this.email,
                password: this.password,
              },
              { headers: { 'Content-Type': 'application/json' } }
            )
            .then((res) => {
              this.$store.commit('auth/setToken', res.data.token)
              this.$cookies.set('token', res.data.token)
              // localStorage.setItem('token', res.data.token)
              this.$router.push('/dashboard')
            })
            .catch(
              (e) => (this.validationMessage = 'Email Or Password Not Valid')
            )
        })
        .catch((e) => (this.validationMessage = 'Email Or Password Not Valid'))
    },
  },
}
</script>

<style scoped>
.form {
  height: 100vh;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>
