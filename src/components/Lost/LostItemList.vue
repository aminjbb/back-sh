<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 pt-3">


        <v-col cols="12">
          <v-row justify="end p-5">


<!--            <ModalTableFilter path="report/index" :filterField="filterField" />-->
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          class="flex-grow-1"
          :header="header"
          :items="itemList"
          :page="page"
          :perPage="dataTableLength"
          :loading="loading"
          @updateList="updateList"
          deletePath="report/crud/delete/"
          model="report" />


      <v-divider />

      <v-card-actions class="pb-3">
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Table from '@/components/Lost/Table/Table.vue'
import Lost from "@/composables/Lost";
import ModalTableFilter from '@/components/WasteAndLost/Filter/Filter.vue'


export default {
  components: {
    Table,
    ModalTableFilter,
  },
  data(){
    return{

    }
  },
  setup(props) {
    const {
      pageLength,
      getWasteAndLostList,
      itemList,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading
    } = Lost();
    return {
      pageLength,
      getWasteAndLostList,
      itemList,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading
    };
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  methods: {
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },

    updateList(status) {
      if (status === 'true') {
        this.getWasteAndLostList();
      }
    },
  },

  mounted() {
    this.getWasteAndLostList();
  },

  watch: {
    dataTableLength(val) {
      this.getWasteAndLostList(val)
    },
  }
}
</script>
