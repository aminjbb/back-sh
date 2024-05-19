<template>
  <div class="h-100 d-flex flex-column align-stretch">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 py-5">
        <v-col cols="6">
          <v-row justify="start">
            <v-btn
                @click="$router.push('/notifications/create')"
                color="primary500"
                height="40"
                rounded
                class="px-8 mt-1">
              <template v-slot:prepend>
                <v-icon>mdi-plus</v-icon>
              </template>
              افزودن
            </v-btn>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row justify="end">
            <ModalColumnFilter
                :changeHeaderShow="changeHeaderShow"
                :header="header"/>

            <PanelFilter
                @resetPage="resetPage"
                path="notifications/index"
                :filterField="filterField"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          class="flex-grow-1"
          deletePath="notification/admin/crud/delete/"
          model="notification"
          :header="header"
          :items="notifications.data"
          :page="page"
          :perPage="dataTableLength"
          :loading="loading"/>

      <v-divider/>

      <v-card-actions class="pb-3">
        <v-row class="pr-5">
          <v-col cols="3"/>
          <v-col cols="6">
            <div class="text-center">
              <v-pagination
                  v-model="page"
                  :length="pageLength"
                  rounded="circle"
                  size="40"
                  :total-visible="7"
                  prev-icon="mdi-chevron-right"
                  next-icon="mdi-chevron-left"/>
            </div>
          </v-col>
          <v-col cols="3">
            <div
                align="center"
                id="rowSection"
                class="d-flex align-center">
                        <span class="ml-5">
                            تعداد سطر در هر صفحه
                        </span>

              <span class="mt-2" id="row-selector">
                            <v-select
                                v-model="dataTableLength"
                                class="t1330"
                                variant="outlined"
                                :items="[25,50,100]"/>
                        </span>
            </div>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
//Component
import Table from '@/components/Notifications/Table/Table.vue'
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from '@/components/Public/ModalExcelDownload.vue'
import Notifications from '@/composables/Notifications';
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";

export default {
  data() {
    return {
      perPageFilter: false
    }
  },
  components: {
    PanelFilter,
    Table,
    ModalColumnFilter,
    ModalGroupAdd,
    ModalExcelDownload
  },

  setup() {
    const {
      pageLength,
      notifications,
      getNotifications,
      dataTableLength,
      page,
      header,
      item,
      loading,
      filterField
    } = Notifications();
    return {
      pageLength,
      notifications,
      getNotifications,
      dataTableLength,
      page,
      header,
      item,
      loading,
      filterField
    };
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    }
  },

  mounted() {
    this.getNotifications()
  },

  watch: {
    confirmModal(val) {
      if (!val) {
        this.getNotifications()
      }
    },

    dataTableLength() {
      this.perPageFilter = true
      this.page = 1
      let query = this.$route.query
      if (query) {
        this.$router.replace({
          query: {
            ...query,
            per_page: this.dataTableLength,
          }
        })
      } else {
        this.$router.push({
          query: {
            per_page: this.dataTableLength,
          }
        })
      }
      this.perPageFilter = false
    },
    page() {
      if (!this.perPageFilter) {
        this.getNotifications()
      }
    }
  },

  methods: {
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },
    resetPage() {
      this.perPageFilter = true
      this.page = 1
      setTimeout(() => {
        this.perPageFilter = false
      }, 1000)
    }
  }
}
</script>
