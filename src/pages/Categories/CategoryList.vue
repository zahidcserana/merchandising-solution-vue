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
                v-model="query.search"
              >
              </base-input>
            </div>

            <div class="col-md-6">
              <base-input
                type="text"
                label="Slug"
                placeholder="Slug"
                v-model="model.slug"
              >
              </base-input>
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
import { index } from '@/api/category'
import { Stretch, CubeShadow } from 'vue-loading-spinner'

const tableColumns = ['Id', 'Name', 'Slug']

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
      title: 'Category List',
      link: '/settings/categories/create',
      label: 'Add Category',
      editLink: '/settings/categories/',
      fetchError: null,
      list: null,
      records: 0,
      loading: false,
      btnText: 'Save',
      model: {
        name: 'Red',
        slug: ''
      },
      query: {
        page: 1,
        limit: 5,
        search: ''
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
    callback: function () {
      this.getList()
    },
    search () {
      this.getList()
    },
    reset () {
      this.query.search = ''
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
