<template>
  <v-data-table
      :headers="header"
      :items="items"
      :items-per-page="perPage"
      :page.sync="currentPage"
      :loading="loading"
      @update:options="updateOptions"
      item-value="index">
    <template v-slot:item.row="{ item, index }">
      <span> {{rowIndexTable(index)}} </span>
    </template>

    <template v-slot:item.id="{ item }">
      <span> {{ item.id }}</span>
    </template>
    <template v-slot:item.name="{ item }">
      <div class="">
          <span>
            <img src="@/assets/img/shps_img.png" :alt="item.name">
          </span>
        <span> {{item.name}} </span>
      </div>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'ReusableTable',
  props: {
    getDriverList: {
      type: Function,
      required: true
    },
    header: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    page: {
      type: Number,
      default: 1
    },
    perPage: {
      type: Number,
      default: 10
    },
    loading: {
      type: Boolean,
      default: false
    },
    activePath: {
      type: String,
      default: ''
    },
    updateUrl: {
      type: String,
      default: ''
    },
    deletePath: {
      type: String,
      default: ''
    },
    model: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      currentPage: this.page,
    }
  },
  methods: {
    updateOptions(options) {
      this.$emit('update:options', options);

    },
    activateItem(item) {
      console.log(`Activating item at ${this.activePath}${item.id}`);
    },
    deleteItem(item) {
      console.log(`Deleting item at ${this.deletePath}${item.id}`);
    },
    massUpdate() {
      console.log(`Mass updating at ${this.updateUrl}`);
    }
  },
  watch: {
    currentPage(newPage) {
      this.$emit('update:page', newPage);
    }
  }
}
</script>