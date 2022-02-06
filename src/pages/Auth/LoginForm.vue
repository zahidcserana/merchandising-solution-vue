<template>
  <card>
    <h4 slot="header" class="card-title">Edit Profile</h4>

    <div v-if="fetchError" class="alert alert-danger">
      <button
        type="button"
        aria-hidden="true"
        data-dismiss="alert"
        class="close"
      >
        <i class="nc-icon nc-simple-remove"></i></button
      ><span><b> Error: </b> {{ fetchError }}</span>
    </div>

    <form @submit.prevent="submitForm" class="m-login__form m-form">
      <div class="row">
        <div class="col-md-6">
          <base-input
            type="text"
            label="Username"
            placeholder="Username"
            v-model.trim="$v.login.username.$model"
            name="Username"
            autocomplete="off"
          >
          </base-input>
        </div>
        <div class="col-md-6"></div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input
            type="password"
            label="Password"
            placeholder="Password"
            v-model.trim="$v.login.password.$model"
            name="password"
          >
          </base-input>
        </div>
        <div class="col-md-6"></div>
      </div>
      <div class="text-center">
        <Stretch v-if="loading" />

        <button
          v-if="!loading"
          type="submit"
          class="btn btn-info btn-fill float-right"
        >
          Login
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
import Card from 'src/components/Cards/Card.vue'
import axios from 'axios'
import { env } from '@/utils/auth'
import { required } from 'vuelidate/lib/validators'
import { Stretch } from 'vue-loading-spinner'

export default {
  components: {
    Card,
    Stretch
  },
  data () {
    return {
      loading: false,
      submitStatus: null,
      login: {
        username: 'ratan7',
        password: 'ratan7',
        loginRemember: null
      },
      fetchError: null
    }
  },
  validations: {
    login: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    submitForm () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loading = true

        setTimeout(() => {
          axios
            .post(env.api_url + 'auth/login', this.login)
            .then(response => {
              const result = response.data
              if (result.success) {
                this.loading = false
                this.fetchError = null
                localStorage.setItem('token', result.data.access_token)
                localStorage.setItem(
                  'userInfo',
                  JSON.stringify(result.data.user)
                )
                this.$router.push('admin/overview')
                // location.reload()
              } else {
                this.loading = false
                this.showError('Wrong user or password')
              }
            })
            .catch(error => {
              this.loading = false
              console.log(error)
              this.showError('Something went wrong!')
            })
        }, 500)
      } else {
        this.showError('Please enter valid credential.')
      }
    },
    showError (msg) {
      this.fetchError = msg
    }
  }
}
</script>
<style></style>
