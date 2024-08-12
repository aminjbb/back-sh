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
      <ShTable
          class="flex-grow-1"
          :headers="header"
          :items="itemListTable"
          :loading="loading"
          :page="page"
          :perPage="dataTableLength"
          :activePath="'category/best_selling/crud/update/activation/'">
        <template v-slot:showSlot="item">
          <v-btn :href="item.data.section ==='system' ? item.data.url :'/notifications/get/' + item.data.id" variant="icon">
            <v-icon color="success">mdi-eye</v-icon>
          </v-btn>
        </template>

        <template v-slot:actionSlot="item">
          <div class="text-center">
            <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
              mdi-dots-vertical
            </v-icon>
          </div>

          <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false" >
            <v-list class="c-table__more-options">
              <v-list-item>
                <v-list-item-title>
                  <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                    <v-icon size="small" class="text-grey-darken-1">
                      mdi-trash-can-outline
                    </v-icon>
                    <span class="mr-2 text-grey-darken-1 t14 w300">حذف</span>
                  </div>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </ShTable>

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
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from '@/components/Public/ModalExcelDownload.vue'
import Notifications from '@/composables/Notifications';
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import {openConfirm} from "@/assets/js/functions";

export default {
  data() {
    return {
      perPageFilter: false,
      itemListTable: [],
      removeTableItem: {
        text: "آیا از حذف آیتم مطمئن هستید؟",
        title: "حذف آیتم",
        path: "notification/admin/crud/delete/",
      },
    }
  },
  components: {
    PanelFilter,
    ModalColumnFilter,
    ModalGroupAdd,
    ModalExcelDownload,
    ShTable
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
    notifications(){
      this.itemListTable = []

      this.notifications.data.forEach((item) =>
          this.itemListTable.push(
              {
                id: item.id,
                section: item.section,
                url: item.url,
                title: item.title,
                created_at: item.created_at_fa,
              },
          ),
      )
    },

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
      }
      else {
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
    },
    $route(){
      this.getNotifications()
    },
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
    },

    removeItem(id) {
      openConfirm(this.$store, this.removeTableItem.text, this.removeTableItem.title, "delete", this.removeTableItem.path + id, true)
    },
  }
}
</script>
