<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 pt-3">

        <v-col cols="6">
          <v-btn
              @click="$router.push('/lucky-wheel/create')"
              color="primary500"
              height="40"
              rounded
              class="px-8 mt-1">
            <template v-slot:prepend>
              <v-icon>mdi-plus</v-icon>
            </template>
            افزودن
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-row justify="end pa-3">
            <PanelFilter
                @resetPage="resetPage"
                :filterField="filterField"
                path="lucky-wheel/index"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <ShTable
          class="flex-grow-1"
          :headers="header"
          :items="itemListTable"
          :page="page"
          :perPage="dataTableLength"
          :loading="loading"
          activePath="game/lucky-wheel/crud/update/activation/"
      >
          <template v-slot:actionSlot="item">
              <div class="text-center">
                  <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                      mdi-dots-vertical
                  </v-icon>
              </div>

              <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false" >
                  <v-list class="c-table__more-options">
                      <v-list-item-title>
                          <div class="ma-3 pointer d--rtl" @click="$router.push(`/lucky-wheel/${item.data.id}/prize-edit`)">
                              <v-icon class="text-grey-darken-1" size="x-small">mdi-text-box-multiple-outline</v-icon>
                              <span class="mr-2 text-grey-darken-1 t14 w300">
                                    ویرایش جایزه
                              </span>
                          </div>
                      </v-list-item-title>
                  </v-list>
              </v-menu>
          </template>
      </ShTable>
      <v-divider />

      <v-card-actions class="pb-3">
        <v-row class="pr-5">
          <v-col cols="3">
          </v-col>

          <v-col cols="6">
            <div class="text-center">
              <v-pagination
                  v-model="page"
                  :length="pageLength"
                  rounded="circle"
                  size="40"
                  :total-visible="7"
                  prev-icon="mdi-chevron-right"
                  next-icon="mdi-chevron-left" />
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
                                :items="[25,50,100]" />
                        </span>
            </div>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {defineAsyncComponent} from 'vue'
import LuckyWheel from "@/composables/LuckyWheel";
const PanelFilter = defineAsyncComponent(() => import('@/components/PanelFilter/PanelFilter.vue'));
import ShTable from "@/components/Components/Table/sh-table.vue";
import {openConfirm} from "@/assets/js/functions";



export default {
  data() {
    return {
    perPageFilter:false,
    itemListTable: []
    }
  },
  components: {
    PanelFilter,
    ShTable
  },

  setup() {
    const activeFilter= [
      {
        label: 'وضعیت',
        value: '',
      },
      {
        label: 'فعال',
        value: '1',
      },
      {
        label: 'غیرفعال',
        value: '0',
      }
    ]
    const {
      pageLength,
      getLuckyWheelList,
      filterFieldLuckyWheel,
      luckyWheel,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading
    } = LuckyWheel();
    return {
      pageLength,
      getLuckyWheelList,
      filterFieldLuckyWheel,
      luckyWheel,
      filterField,
      dataTableLength,
      page,
      header,
      addPagination,
      addPerPage,
      loading,
      activeFilter
    };
  },

  methods: {
    resetPage(){
      this.perPageFilter = true
      this.page = 1
      setTimeout(()=>{
        this.perPageFilter = false
      }, 1000)
    },

    removeItem(id) {
      openConfirm(this.$store, "از حذف آیتم اطمینان دارید؟", "حذف آیتم", "delete", "game/lucky-wheel/prize/crud/delete/" + id, true);
    },
  },

  mounted() {
    this.getLuckyWheelList();
  },

  watch: {
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
    page(){
      if (!this.perPageFilter){
        this.getLuckyWheelList()
      }
    },
    $route(){
      this.getLuckyWheelList()
    },

    luckyWheel() {
      this.itemListTable = []
      this.luckyWheel.forEach((item) => {
          this.itemListTable.push(
              {
                  id: item.id,
                  name: item.name,
                  label: item.label,
                  start_time_fa: item.start_time_fa,
                  end_time_fa: item.end_time_fa,
                  turn_per_user: item.turn_per_user,
                  is_active: item.is_active,
                  is_active_id: item.id,
              }
          )
      })
    },
  }
}
</script>
