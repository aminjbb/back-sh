

<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header/>
<!--      <DataCategories/>-->
      <div class="h-100 d-flex flex-column align-stretch">
        <v-card
            height="70"
            class="ma-5 br--12 stretch-card-header-70"
        >
          <v-row
              justify="center"
              align="center"
              class="px-10 py-5"
          >
            <v-col cols="6">
              <v-row justify="start">
                <v-btn
                    @click="$router.push('/categories/create')"
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
                    getEndPoint="category/csv/get/template"
                    uploadEndpoint="category/csv/bulk"
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
                    path="categories/index"
                    :filterField="filterField"
                    :statusItems="activeStatus"
                    :categoriesList="categoriesList"
                />
              </v-row>
            </v-col>

          </v-row>
        </v-card>
        <v-card
            class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch"
            height="580">
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :loading="loading"
              :page="page"
              :perPage="dataTableLength"
              activePath="category/crud/update/activation/">
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
                      <div class="ma-5 pointer" @click="$router.push(`/categories/edit/${item.data.id}`)">
                        <v-icon size="small" class="text-grey-darken-1">
                          mdi-pen
                        </v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">ویرایش</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="removeItem(item.data.id)">
                        <v-icon size="xsmall" class="text-grey-darken-1">mdi-trash-can-outline</v-icon>
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
              <v-col cols="3">
                <ModalExcelDownload getEndPoint="category/csv/get/export"/>

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
                      next-icon="mdi-chevron-left"
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
<script>
import {defineAsyncComponent, ref} from "vue";
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import ModalGroupAdd from "@/components/Public/ModalGroupAdd.vue";
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import Categories from "@/composables/Categories";
import {openConfirm, openToast} from "@/assets/js/functions";
const DataCategories = defineAsyncComponent(()=> import ('@/components/Categories/DataCategories.vue'))
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))

export default {
  components:{
    PanelFilter,
    ShTable,
    ModalColumnFilter,
    ModalGroupAdd,
    ModalExcelDownload,
    DashboardLayout,
    Header
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
    const {
      pageLength,
      categoreis,
      allCategories,
      getAllCategories,
      getCategories,
      dataTableLength,
      page,
      header,
      item,
      filterField,
      loading
    } = Categories();
    return {
      pageLength,
      categoreis,
      allCategories,
      getAllCategories,
      getCategories,
      dataTableLength,
      page,
      header,
      item,
      filterField,
      loading,
      activeStatus
    };
  },

  data() {
    return {
      perPageFilter: false,
      itemListTable: [],
      removeTableItem: {
        text: "آیا از حذف آیتم مطمئن هستید؟",
        title: "حذف آیتم",
        path: "category/crud/delete/",
      },
    }
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    },

    categoriesList() {
      try {
        const categories = []
        this.allCategories.data.forEach(element => {
          const form = {
            label: element.label,
            value: element.id
          }
          categories.push(form)
        });
        return categories
      } catch (error) {
        return []
      }
    },
  },

  mounted() {
    this.getAllCategories();
  },

  methods: {
    /**
     * Change Header Status
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
    categoreis() {
      this.itemListTable = []

      this.categoreis.data.forEach((item) =>
          this.itemListTable.push(
              {
                id: item.id,
                name: item.name,
                label: item.label,
                is_active: item.is_active,
                is_active_id: item.id,
              },
          ),
      )
    },

    confirmModal(val) {
      if (localStorage.getItem('deleteObject')) {
        if (!val) {
          this.getCategories()
          openToast(
              this.$store,
              'آیتم مورد نظر با موفقیت حذف شد',
              "success"
          );
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
    $route() {
      this.getCategories()
    },
    page() {
      if (!this.perPageFilter) {
        this.getCategories()
      }
    }
  },
}
</script>
