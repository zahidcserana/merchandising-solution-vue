<template>
  <div class="row">
    <div class="col-12">
      <user-form :userInfo="userInfo" :editMode="true"/>
    </div>
  </div>
</template>
<script>
import UserForm from './UserForm'
import { getUser } from '@/api/user'

export default {
  components: {
    UserForm
  },
  data () {
    return {
      userInfo: {
        username: '',
        email: '',
        name: '',
        about: ''
      }
    }
  },
  created () {
    this.getUser(this.$route.params.id)
  },
  methods: {
    getUser (id) {
      getUser(id)
        .then(response => {
          if (response.success) {
            this.fetchError = null
            this.userInfo.name = response.data.name
            this.userInfo.username = response.data.username
            this.userInfo.email = response.data.email
            this.userInfo.about = response.data.about
          } else {
            this.showError(response.sccess)
          }
        })
        .catch(err => {
          console.log(err)
          this.showError('Something went wrong.')
        })
    }
  }
}
</script>
<style></style>
