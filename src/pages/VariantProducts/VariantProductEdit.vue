<template>
  <div class="row">
    <div class="col-12">
      <variant-product-form :modelInfo="modelInfo" :editMode="true" />
    </div>
  </div>
</template>
<script>
import VariantProductForm from './VariantProductForm'
import { view } from '@/api/variantProduct'
import { VariantProductModel } from './VariantProduct.model'

export default {
  components: {
    VariantProductForm
  },
  data () {
    return {
      modelInfo: VariantProductModel
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
            this.modelInfo.product_id = response.data.product
            this.modelInfo.color_id = response.data.colorId
            this.modelInfo.size_id = response.data.sizeId
            this.modelInfo.quantity = response.data.quantity
            this.modelInfo.po_quantity = response.data.poQuantity
            this.modelInfo.ready_quantity = response.data.readyQuantity
            this.modelInfo.delivered_quantity = response.data.deliveredQuantity
            this.modelInfo.is_default = response.data.isDefault
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
