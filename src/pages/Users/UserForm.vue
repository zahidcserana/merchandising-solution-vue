<template>
  <card>
    <template #header>
      <Alert
        :title="title"
        :fetchError="fetchError"
        :link="link"
        :label="label"
      />
    </template>

    <form class="m-login__form m-form" id="schedule_form">
      <div class="row">
        <div class="col-md-6">
          <base-input
            type="text"
            label="Name"
            placeholder="Name"
            v-model="user.name"
          >
          </base-input>
        </div>

        <div class="col-md-6">
          <base-input
            type="email"
            label="Email"
            placeholder="Email"
            v-model="user.email"
          >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <base-input
            type="text"
            label="Username"
            placeholder="Username"
            v-model="user.username"
          >
          </base-input>
        </div>
        <div class="col-md-6">
          <base-input
            v-if="!editMode"
            type="text"
            label="Password"
            placeholder="Password"
            v-model="user.password"
          >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>About Me</label>
            <textarea
              rows="5"
              class="form-control border-input"
              placeholder="Here can be your description"
              v-model="user.about"
            >
            </textarea>
          </div>
        </div>
      </div>
      <div class="text-center">
        <Stretch v-if="loading" />
        <button
          v-if="!loading && !editMode"
          type="button"
          class="btn btn-info btn-fill float-right"
          @click="submit"
          v-html="btnText"
        ></button>
        <button
          v-if="!loading && editMode"
          type="button"
          class="btn btn-success btn-fill float-right"
          @click="update"
        >
          Update
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
import Card from 'src/components/Cards/Card.vue'
import { userCreate, updateUser } from '@/api/user'
import { Stretch } from 'vue-loading-spinner'
import Alert from '@/pages/Common/Component/Alert'

export default {
  components: {
    Card,
    Stretch,
    Alert
  },
  props: {
    editMode: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          username: ''
        }
      }
    }
  },
  data () {
    return {
      title: 'Add User',
      link: '/users',
      label: 'User List',
      fetchError: null,
      loading: false,
      btnText: 'Save',
      user: {
        id: undefined,
        username: 'michael23',
        email: '',
        password: '123456789',
        name: 'Mike',
        about: `Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.`
      }
    }
  },
  beforeMount () {
    this.btnText = this.$bold(this.btnText)
  },
  created () {
    if (this.editMode) {
      this.user = this.userInfo
    }
  },
  methods: {
    reset () {
      this.user.name = ''
      this.user.username = ''
      this.user.email = ''
      this.user.password = ''
      this.user.about = ''
    },
    submit () {
      this.loading = true
      userCreate(this.user)
        .then(response => {
          if (response.success) {
            this.fetchError = null
            this.$notifications.success()
            this.reset()
          } else {
            this.$notifications.warning()
          }
        })
        .catch(err => {
          console.log(err)
          this.showError('Something went wrong!')
        })

      this.loading = false
    },
    update () {
      this.loading = true
      this.user.id = this.$route.params.id
      updateUser(this.user)
        .then(response => {
          if (response.success) {
            console.log('ok1')
            this.user = response.data

            this.fetchError = null
            this.$notifications.success()
          } else {
            this.$notifications.warning()
          }
        })
        .catch(err => {
          console.log(err)
          this.showError('Something went wrong!')
        })

      this.loading = false
    },
    showError (msg) {
      this.fetchError = msg
    }
  }
}
</script>
