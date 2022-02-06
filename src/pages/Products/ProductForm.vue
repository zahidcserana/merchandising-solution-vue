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
          <base-input
            type="text"
            label="Name"
            placeholder="Name"
            v-model="model.name"
          >
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input
            type="text"
            label="Barcode"
            placeholder="Barcode"
            v-model="model.barcode"
          >
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input
            type="text"
            label="Composition"
            placeholder="Composition"
            v-model="model.composition"
          >
          </base-input>
        </div>
        <div class="col-md-4">
          <v-select
            v-model="model.categoryId"
            :options="categories"
            :reduce="category => category.id"
            :placeholder="'--Category--'"
          ></v-select>
        </div>
        <div class="col-md-4">
          <v-select
            multiple
            v-model="model.colors"
            :options="colors"
            :reduce="color => color.id"
            :placeholder="'--Colors--'"
          ></v-select>
        </div>
        <div class="col-md-4">
          <v-select
            multiple
            v-model="model.sizes"
            :options="sizes"
            :reduce="size => size.id"
            :placeholder="'--Sizes--'"
          ></v-select>
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
import { create, update } from '@/api/product'
import { categoryList } from '@/api/category'
import { colorList } from '@/api/color'
import { sizeList } from '@/api/size'
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
    modelInfo: {
      type: Object,
      default: () => {
        return {
          name: '',
          barcode: '',
          composition: '',
          categoryId: '',
          variants: '',
          colors: [],
          sizes: [],
          price: null,
          quantity: null,
          po_quantity: null,
          po_quantity: null,
          delivered_quantity: null,
          status: ''
        }
      }
    }
  },
  data () {
    return {
      title: 'Add Product',
      link: '/products',
      label: 'Product List',
      fetchError: null,
      loading: false,
      btnText: 'Save',
      categories: [],
      colors: [],
      sizes: [],
      search: '',
      model: {
        id: undefined,
        name: '',
        barcode: '',
        composition: '',
        categoryId: '',
        variants: '',
        colors: [],
        sizes: [],
        price: null,
        quantity: null,
        po_quantity: null,
        po_quantity: null,
        delivered_quantity: null,
        status: ''
      }
    }
  },
  beforeMount () {
    this.btnText = this.$bold(this.btnText)
  },
  created () {
    this.getCategories()
    this.getColors()
    this.getSizes()

    if (this.editMode) {
      this.model = this.modelInfo
    }
  },
  methods: {
    getCategories () {
      categoryList(this.search)
        .then(response => {
          if (response.success) {
            this.categories = response.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getColors () {
      colorList(this.search)
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
      sizeList(this.search)
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
