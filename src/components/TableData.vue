<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <tr>
          <th v-for="(column, key) in columns" :key="key">
            {{ column.value }}
          </th>
          <th>Action</th>
        </tr>
      </slot>
    </thead>
    <tbody>
      <tr></tr>
      <tr v-for="(item, index) in data" :key="index">
        <slot :row="item">
          <td v-for="(column, key) in columns" :key="key">
            <span v-if="column.link">
              <router-link :to="item[column.key].url.link" class="link-type">
                {{ item[column.key].url.title }}
              </router-link>
            </span>
            <span v-else>
              {{ itemValue(item, column) }}
            </span>
          </td>
          <td>
            <router-link :to="editLink + item.id" class="link-type">
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
  name: 'table-data',
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
      return item[column.key]
    }
  }
}
</script>
<style></style>
