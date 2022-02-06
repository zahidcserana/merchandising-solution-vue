<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <tr>
          <th v-for="column in columns" :key="column">{{ column }}</th>
          <th>Action</th>
        </tr>
      </slot>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <slot :row="item">
          <td
            v-for="column in columns"
            :key="column"
            v-if="hasValue(item, column)"
          >
            <span>
              {{ itemValue(item, column) }}
            </span>
          </td>
          <td>
            <router-link :to="editLink+item.id" class="link-type">
              View
            </router-link>
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: 'l-table',
  props: {
    columns: Array,
    data: Array,
    editLink: String
  },
  methods: {
    hasValue (item, column) {
      return item[column.toLowerCase()] !== 'undefined'
    },
    itemValue (item, column) {
      return item[column.toLowerCase()]
    }
  }
}
</script>
<style></style>
