<template>
  <div class="row">
    <div class="col-12">
      <color-form :modelInfo="modelInfo" :editMode="true" />
    </div>
  </div>
</template>
<script>
import ColorForm from './ColorForm'
import { view } from '@/api/color'

export default {
  components: {
    ColorForm
  },
  data () {
    return {
      modelInfo: {
        name: '',
        slug: ''
      }
    }
  },
  created () {
    this.getModel(this.$route.params.id)
  },
  methods: {
    getModel (id) {
      view(id)
        .then(response => {
          if (response.success) {
            this.fetchError = null
            this.modelInfo.name = response.data.name
            this.modelInfo.slug = response.data.slug
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
