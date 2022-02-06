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
        <div class="col-md-4">
          <v-select
            label="name"
            :filterable="false"
            v-model="model.product_id"
            :reduce="product => product.id"
            :options="products"
            :placeholder="'--Product--'"
            @search="onSearch"
          >
            <template slot="no-options">
              type to search products
            </template>
            <template slot="option" slot-scope="option">
              <div class="d-center">
                {{ option.name }}
              </div>
            </template>
            <template slot="selected-option" slot-scope="option">
              <div class="selected d-center">
                {{ option.name }}
              </div>
            </template>
          </v-select>
        </div>
        <div class="col-md-4">
          <v-select
            v-model="model.color_id"
            :options="colors"
            :reduce="color => color.id"
            :placeholder="'--Colors--'"
          ></v-select>
        </div>
        <div class="col-md-4">
          <v-select
            v-model="model.size_id"
            :options="sizes"
            :reduce="size => size.id"
            :placeholder="'--Sizes--'"
          ></v-select>
        </div>
        <div class="col-md-4">
          <base-input
            type="text"
            label="Quantity"
            placeholder="Quantity"
            v-model="model.quantity"
          >
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input
            type="text"
            label="PO Quantity"
            placeholder="PO Quantity"
            v-model="model.po_quantity"
          >
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input
            type="text"
            label="Ready Quantity"
            placeholder="Ready Quantity"
            v-model="model.ready_quantity"
          >
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input
            type="text"
            label="Delivered Quantity"
            placeholder="Delivered Quantity"
            v-model="model.delivered_quantity"
          >
          </base-input>
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
import { create, update } from '@/api/variantProduct'
import { productList } from '@/api/product'
import { colorList } from '@/api/color'
import { sizeList } from '@/api/size'
import { Stretch } from 'vue-loading-spinner'
import Alert from '@/pages/Common/Component/Alert'
import { instance } from '@/utils/auth'
import { VariantProductModel } from './VariantProduct.model'

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
    modelInfo: {
      type: Object,
      default: () => VariantProductModel
    }
  },
  data () {
    return {
      title: 'Add Variant',
      link: '/variants',
      label: 'Variant List',
      fetchError: null,
      loading: false,
      btnText: 'Save',
      products: [],
      colors: [],
      sizes: [],
      productOption: {
        id: undefined,
        search: undefined
      },
      model: {
        id: undefined,
        product_id: '',
        color_id: '',
        size_id: '',
        quantity: null,
        po_quantity: null,
        ready_quantity: null,
        delivered_quantity: null,
        is_default: false
      }
    }
  },
  beforeMount () {
    this.btnText = this.$bold(this.btnText)
  },
  created () {
    this.getColors()
    this.getSizes()

    if (this.editMode) {
      this.model = this.modelInfo
    }
  },
  methods: {
    onSearch (search, loading) {
      if (search.length) {
        loading(true)
        this.mySearchData(loading, search, this)
      }
    },
    mySearchData (loading, search, vm) {
      instance.get('products/list?search=' + search).then(response => {
        vm.products = response.data.data
        loading(false)
      })
    },
    getColors () {
      colorList()
        .then(response => {
          if (response.success) {
            this.colors = response.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getSizes () {
      sizeList()
        .then(response => {
          if (response.success) {
            this.sizes = response.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    submit () {
      this.loading = true
      create(this.model)
        .then(response => {
          if (response.success) {
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
    update () {
      this.loading = true
      this.model.id = this.$route.params.id
      update(this.model)
        .then(response => {
          if (response.success) {
            // this.model = response.data

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
