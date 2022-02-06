<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <login-form />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import LoginForm from './LoginForm.vue'

  export default {
    components: {
      LoginForm
    }
  }

</script>
<style>

</style>
