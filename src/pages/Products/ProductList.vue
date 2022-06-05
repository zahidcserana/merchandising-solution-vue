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
              <base-input
                type="text"
                label="Search"
                placeholder="Search"
                v-model="query.search.term"
              >
              </base-input>
            </div>
            <div class="col-md-6">
              <label for="category_id">Category</label>
              <v-select
                v-model="query.search.category_id"
                :options="categories"
                :reduce="category => category.id"
                :placeholder="'--Category--'"
              ></v-select>
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
import LTable from 'src/components/Table.vue'
import Card from 'src/components/Cards/Card.vue'
import Alert from '@/pages/Common/Component/Alert'
import pagination from 'vue-pagination-2'
import { index } from '@/api/product'
import { Stretch, CubeShadow } from 'vue-loading-spinner'
import { categoryList } from '@/api/category'

const tableColumns = ['Id', 'Name', 'Barcode', 'Category']

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
      title: 'Product List',
      link: '/products/create',
      label: 'Add Product',
      editLink: '/products/',
      remove: true,
      modelName: 'products',
      fetchError: null,
      list: null,
      records: 0,
      loading: false,
      btnText: 'Search',
      categories: [],
      model: {
        name: 'Red',
        barcode: ''
      },
      query: {
        page: 1,
        limit: 5,
        search: {
          term: '',
          category_id: ''
        }
      },
      table: {
        columns: [...tableColumns]
      }
    }
  },
  created () {
    this.getCategories()
    this.getList()
  },
  methods: {
    getCategories () {
      categoryList()
        .then(response => {
          if (response.success) {
            this.categories = response.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    callback: function () {
      this.getList()
    },
    search () {
      this.getList()
    },
    reset () {
      this.query.search.term = ''
      this.query.search.category_id = ''
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
