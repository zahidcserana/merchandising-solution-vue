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
                type="email"
                label="Email"
                placeholder="Email"
                v-model="user.email"
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
        <CubeShadow class="text-center"/>
      </card>
      <card
        v-else
        class="strpied-tabled-with-hover"
        body-classes="table-full-width table-responsive"
      >
        <l-table
          class="table-hover table-striped"
          :columns="table.columns"
          :data="users"
          :editLink="editLink"
        >
        </l-table>
        <pagination
          class="float-right"
          v-model="query.page"
          :per-page="query.limit"
          :records="records"
          :options="options"
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
import MyPagination from './MyPagination'
import { userList } from '@/api/user'
import { Stretch, CubeShadow } from 'vue-loading-spinner'

const tableColumns = ['Id', 'Name', 'email', 'username']

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
      title: 'User List',
      link: '/users/create',
      label: 'Add User',
      editLink: '/users/edit/',
      fetchError: null,
      users: null,
      records: 0,
      loading: false,
      btnText: 'Save',
      user: {
        username: 'michael23',
        email: '',
        password: '123456789',
        name: 'Mike',
        about: `Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.`
      },
      query: {
        page: 1,
        limit: 5,
        search: ''
      },
      options: {
        theme: 'bootstrap4',
        chunk: 5,
        texts: {
          first: 'Start',
          last: 'End'
        },
        template: MyPagination,
        edgeNavigation: true
      },

      table: {
        columns: [...tableColumns]
      }
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    callback: function () {
      this.getUsers()
    },
    search () {
      this.getUsers()
    },
    reset () {
      this.query.search = ''
      this.query.page = 1
      this.query.limit = 5
    },
    refresh () {
      this.reset()
      this.getUsers()
    },
    getUsers () {
      this.loading = true

      userList(this.query)
        .then(response => {
          if (response.success) {
            this.fetchError = null
            this.users = response.data.results
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
