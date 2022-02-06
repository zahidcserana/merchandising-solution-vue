<template>
  <div class="row">
    <div class="col-12">
      <product-form :modelInfo="modelInfo" :editMode="true" />
    </div>
  </div>
</template>
<script>
import ProductForm from './ProductForm'
import { view } from '@/api/product'
import { ProductModel } from '@/pages/Products/Product.model'

export default {
  components: {
    ProductForm
  },
  data () {
    return {
      modelInfo: ProductModel
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
            this.modelInfo.id = response.data.id
            this.modelInfo.name = response.data.name
            this.modelInfo.categoryId = response.data.categoryId
            this.modelInfo.colors = response.data.colors
            this.modelInfo.sizes = response.data.sizes
            this.modelInfo.composition = response.data.composition
            this.modelInfo.barcode = response.data.barcode
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
