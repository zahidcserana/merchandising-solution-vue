<template>
  <div class="row">
    <div class="col-12">
      <card>
        <template #header>
          <alert
            :title="title"
            :fetchError="fetchError"
            :link="link"
            :label="label"
          />
        </template>

        <form class="m-login__form m-form" id="schedule_form">
          <div class="row">
            <div class="col-md-6">
              <v-select
                label="name"
                :filterable="false"
                v-model="query.search.product_id"
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

            <div class="col-md-6">
              <!-- <base-input
                type="text"
                label="Slug"
                placeholder="Slug"
                v-model="model.barcode"
              >
              </base-input> -->
            </div>
          </div>

          <div class="text-center">
            <Stretch v-if="loading" />
            <button
              v-if="!loading"
              type="button"
              class="btn btn-info btn-fill"
              @click="search"
              v-html="btnText"
            ></button>
            &nbsp;
            <button
              v-if="!loading"
              type="button"
              class="btn btn-warning btn-fill"
              @click="refresh"
            >
              Reset
            </button>
          </div>
          <div class="clearfix"></div>
        </form>
      </card>
    </div>

    <div class="col-12">
      <card class="card-plain" v-if="loading">
        <CubeShadow class="text-center" />
      </card>
      <card
        v-else
        class="strpied-tabled-with-hover"
        body-classes="table-full-width table-responsive"
      >
        <l-table
          class="table-hover table-striped"
          :columns="table.columns"
          :data="list"
          :editLink="editLink"
          :remove="remove"
          :modelName="modelName"
        >
        </l-table>
        <pagination
          class="float-right"
          v-model="query.page"
          :per-page="query.limit"
          :records="records"
          @paginate="callback"
        />
      </card>
    </div>
  </div>
</template>
<script>
import LTable from 'src/components/TableData.vue'
import Card from 'src/components/Cards/Card.vue'
import Alert from '@/pages/Common/Component/Alert'
import pagination from 'vue-pagination-2'
import { index } from '@/api/variantProduct'
import { Stretch, CubeShadow } from 'vue-loading-spinner'
import { instance } from '@/utils/auth'

// const tableColumns = [
//   'Id',
//   'productid',
//   'color id',
//   'Size',
//   'Quantity',
//   'poquantity',
//   'Ready Quantity',
//   'Delivered Quantity',
//   'Is Default'
// ]

const tableColumns = [
  { key: 'id', value: 'ID' },
  { key: 'product', value: 'Product', link: true },
  { key: 'color', value: 'Color', link: true },
  { key: 'size', value: 'Size', link: true },
  { key: 'quantity', value: 'Quantity' },
  { key: 'poQuantity', value: 'PO Quantity' },
  { key: 'readyQuantity', value: 'Ready Quantity' },
  { key: 'deliveredQuantity', value: 'Delivered Quantity' },
  { key: 'isDefault', value: 'Is Default' }
]

export default {
  components: {
    LTable,
    Card,
    Alert,
    pagination,
    Stretch,
    CubeShadow
  },
  data () {
    return {
      title: 'Variant List',
      link: '/variants/create',
      label: 'Add Variant',
      editLink: '/variants/',
      remove: true,
      modelName: 'variant_products',
      fetchError: null,
      list: null,
      records: 0,
      loading: false,
      btnText: 'Search',
      products: [],
      model: {
        name: 'Red',
        barcode: ''
      },
      query: {
        page: 1,
        limit: 5,
        search: {
          product_id: ''
        }
      },
      table: {
        columns: [...tableColumns]
      }
    }
  },
  created () {
    this.getList()
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
    callback: function () {
      this.getList()
    },
    search () {
      this.getList()
    },
    reset () {
      this.query.search.product_id = ''
      this.query.search.term = ''
      this.query.page = 1
      this.query.limit = 5
    },
    refresh () {
      this.reset()
      this.getList()
    },
    getList () {
      this.loading = true

      index(this.query)
        .then(response => {
          if (response.success) {
            this.fetchError = null
            this.list = response.data.results
            this.list.forEach(row => {
              row.product.url = {
                link: '/products/' + row.product.id,
                title: row.product.name
              }
              row.color.url = {
                link: '/settings/colors/' + row.color.id,
                title: row.color.name
              }
              row.size.url = {
                link: '/settings/sizes/' + row.size.id,
                title: row.size.name
              }
            })
            this.records = response.data.total
          } else {
            this.showError(response.sccess)
          }
        })
        .catch(err => {
          console.log(err)
          this.showError('Something went wrong.')
        })
      this.loading = false
    },
    showError (msg) {
      this.fetchError = msg
    },
    getEditLink (item) {
      let edit = '<router-link > View </router-link>'
      return edit
    }
  }
}
</script>
<style>
.page-link {
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  line-height: 1.25;
  color: #007bff;
  background-color: #fff;
  border: 1px solid #dee2e6;
  cursor: pointer;
}
</style>
