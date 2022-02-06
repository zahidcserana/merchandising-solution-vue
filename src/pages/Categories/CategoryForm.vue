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
        <div class="col-md-6">
          <base-input
            type="text"
            label="Name"
            placeholder="Name"
            v-model="model.name"
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
import { create, update } from '@/api/category'
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
          slug: ''
        }
      }
    }
  },
  data () {
    return {
      title: 'Add Category',
      link: '/settings/categories',
      label: 'Category List',
      fetchError: null,
      loading: false,
      btnText: 'Save',
      model: {
        id: undefined,
        name: 'Male',
        slug: ''
      }
    }
  },
  beforeMount () {
    this.btnText = this.$bold(this.btnText)
  },
  created () {
    if (this.editMode) {
      this.model = this.modelInfo
    }
  },
  methods: {
    reset () {
      this.model.name = ''
      this.model.slug = ''
    },
    submit () {
      this.loading = true
      create(this.model)
        .then(response => {
          if (response.success) {
            this.fetchError = null
            this.$notifications.success()
            this.reset()
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
            console.log('ok1')
            this.model = response.data

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
