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
            <router-link :to="editLink + item.id" class="btn btn-info">
              <i class="fa fa-edit"></i>
            </router-link>
            <Button
              v-if="remove"
              @click="removeModel(item.id, modelName)"
              class="btn btn-danger"
            >
              <i class="fa fa-trash"></i>
            </Button>
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>
<script>
import request from "@/utils/request";
import { env } from "@/utils";

export default {
  name: "l-table",
  props: {
    columns: Array,
    data: Array,
    editLink: String,
    remove: Boolean,
    modelName: String
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },
    removeModel(id, modelName) {
      console.log("remove" + id);
      if (confirm("Do you want to delete!") == true) {
        request({
          url: `${env.api_url}/${modelName}/${id}`,
          method: "delete"
        });
        this.$router.go();
      }
    }
  }
};
</script>
<style></style>
