<template>
  <div class="content-header">
    <div style="display: flex;">
      <h4 slot="header" class="card-title" v-highlight style="flex: 1;">
        {{ title ? $upperCase(title) : 'AMS' }}
      </h4>

      <div v-if="link">
        <router-link
          class="btn btn-info btn-fill float-right"
          :to="{ path: link }"
        >
          <i class="nc-icon nc-stre-left"></i>&nbsp;&nbsp; {{ label }}
        </router-link>
      </div>
    </div>
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
  </div>
</template>

<script>
export default {
  components: {},
  props: ['fetchError', 'title', 'link', 'label']
}
</script>
