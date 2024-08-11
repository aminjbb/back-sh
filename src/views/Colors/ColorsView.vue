
<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
<!--        <DataColors/>-->
      <div class="h-100 d-flex flex-column align-stretch">
        <v-card
            height="70"
            class="ma-5 br-12 stretch-card-header-70"
        >
          <v-row
              justify="center"
              align="center"
              class="px-10 py-5"
          >
            <v-col cols="6">
              <v-row justify="start">
                <v-btn
                    @click="$router.push('/color/create')"
                    color="primary500"
                    height="40"
                    rounded
                    class="px-8 mt-1"
                >
                  <template v-slot:prepend>
                    <v-icon>mdi-plus</v-icon>
                  </template>
                  افزودن
                </v-btn>

                <ModalGroupAdd
                    getEndPoint="product/color/csv/get/template"
                    uploadEndpoint="product/color/csv/bulk"
                />
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row justify="end">
                <ModalColumnFilter
                    :changeHeaderShow="changeHeaderShow"
                    :header="header"
                />

                <PanelFilter
                    @resetPage="resetPage"
                    path="color/index"
                    :filterField="filterField"
                    :statusItems="activeStatus"
                />
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card
            class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch"
            height="580">
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :loading="loading"
              :page="page"
              :perPage="dataTableLength"
              activePath="product/color/crud/update/activation/">
            <template v-slot:colorSlot="item">
              <v-icon
                  icon="mdi-circle"
                  size="small"
                  :style="{ color: item.data.color }"
                  :class="item.data.color == '#FFFFFF' ? 'icon-bordered' : ''" />
              {{ item.data.label }}
            </template>

            <template v-slot:actionSlot="item">
              <div class="text-center">
                <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                  mdi-dots-vertical
                </v-icon>
              </div>
              <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false">
                <v-list class="c-table__more-options">
                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push(`/color/edit/${item.data.id}`)">
                        <v-icon size="small" class="text-grey-darken-1">
                          mdi-pen
                        </v-icon>
                        <span class="mr-2 text-grey-darken-1 t14300">ویرایش</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                        <v-icon size="xsmall" class="text-grey-darken-1">mdi-trash-can-outline</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14300">حذف</span>
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
              <v-col cols="3">
                <ModalExcelDownload getEndPoint="product/color/csv/get/export"/>
              </v-col>

              <v-col cols="6">
                <div class="text-center">
                  <v-pagination
                      v-model="page"
                      :length="pageLength"
                      rounded="circle"
                      prev-icon="mdi-chevron-right"
                      next-icon="mdi-chevron-left"
                      size="40"
                      :total-visible="7"
                  />
                </div>
              </v-col>

              <v-col cols="3">
                <div
                    align="center"
                    id="rowSection"
                    class="d-flex align-center"
                >
                            <span class="ml-5">
                                تعداد سطر در هر صفحه
                            </span>

                  <span class="mt-2" id="row-selector">
                                <v-select
                                    v-model="dataTableLength"
                                    class="t1330"
                                    variant="outlined"
                                    :items="[25,50,100]"
                                />
                            </span>
                </div>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </div>

    </v-main>
  </v-layout>
</template>

<script >
import {defineAsyncComponent, ref} from "vue";
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import ModalGroupAdd from "@/components/Public/ModalGroupAdd.vue";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import Colors from "@/composables/Colors";
import {openConfirm, openToast} from "@/assets/js/functions";
const DataColors = defineAsyncComponent(()=> import ('@/components/Colors/DataColors.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
export default {
  components:{
    DashboardLayout,
    Header,
    ShTable,
    ModalColumnFilter,
    PanelFilter,
    ModalGroupAdd,
    ModalExcelDownload
  },

  data() {
    return {
      perPageFilter: false,
      itemListTable:[],
      removeTableItem: {
        text: "آیا از حذف آیتم مطمئن هستید؟",
        title: "حذف آیتم",
        path: "product/color/crud/delete/",
      },
    }
  },

  setup() {
    const activeStatus = ref([
      {
        label: 'همه',
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
    ])
    const {pageLength, filterField, color, getColor, dataTableLength, page, header, item, loading} = Colors();
    return {pageLength, filterField, color, getColor, dataTableLength, page, header, item, loading, activeStatus};
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    },
  },

  mounted() {
    this.getColor();
  },

  methods: {
    /**
     * Change header status
     * @param {*} index
     * @param {*} value
     */
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
  },

  watch: {
    color(){
      this.itemListTable = []

      this.color.data.forEach((item) =>
          this.itemListTable.push(
              {
                id: item.id,
                name: item.name,
                label: item.label,
                group: item.group,
                is_active: item.is_active,
                is_active_id: item.id,
                color: item.value,
              },
          ),
      )
    },

    confirmModal(val) {
      if (localStorage.getItem('deleteObject')) {
        if (!val) {
          this.getColor()
          openToast(this.$store, 'آیتم مورد نظر با موفقیت حذف شد', "success")
          localStorage.removeItem('deleteObject')
        }
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
        this.getColor()
      }
    },

    $route() {
      this.getColor()
    }
  }
}

</script>

