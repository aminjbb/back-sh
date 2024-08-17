<template>
  <div class="h-100 d-flex flex-column align-stretch">
    <v-card
        min-height="70"
        class="ma-5 br--12 stretch-card-header-70"
    >
      <v-row
          justify="center"
          align="center"
          class="px-10 py-3"
      >
        <v-col cols="6" justify="start" class="d-flex">
          <ModalGroupAdd
              getEndPoint="product/sku/group/csv/get/template"
              uploadEndpoint="product/sku/group/csv/bulk"
          />
        </v-col>

        <v-col cols="6">
          <v-row justify="end">
            <ModalColumnFilter
                :header="skuGroupsHeader"
                :changeHeaderShow="changeHeaderShow"
            />

            <PanelFilter
                @resetPage="resetPage"
                :path="`product/get/skugroups/index`"
                :filterField="filterField"
                :statusItems="activeStatus"
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
          :headers="skuGroupsHeader"
          :items="itemListTable"
          :loading="skuGroupLoading"
          :page="page"
          :perPage="dataTableLength"
          activePath="product/crud/update/activation/">
        <template v-slot:showSlot="item">
          <v-btn :href="`${item.data.id}/sku/index`" variant="icon">
            <v-icon color="success">mdi-eye</v-icon>
          </v-btn>
        </template>

        <template v-slot:customSlot="item">
          <v-btn :href="`/product/get/${item.data.product_id}/skugroup/${item.data.id}/create/sku`" variant="icon">
            <v-icon color="success">mdi-plus</v-icon>
          </v-btn>
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
                  <div class="ma-5 pointer" @click="$router.push(`/product/get/skugroups/update/${item.data.id}`)">
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
            <ModalExcelDownload getEndPoint="product/sku/group/csv/get/export"/>
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
              >
              </v-pagination>
            </div>
          </v-col>

          <v-col cols="3">
            <div
                align="center"
                id="rowSection"
                class="d-flex align-center">
              <span class="ml-5">تعداد سطر در هر صفحه</span>
              <span
                  class="mt-2"
                  id="row-selector">
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
</template>
<script>
import {openToast, openConfirm} from "@/assets/js/functions";
import ShTable from "@/components/Components/Table/sh-table.vue";
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from '@/components/Public/ModalExcelDownload.vue'
import Sku from '@/composables/Sku';
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue";
import {ref} from "vue";

export default {
  components: {
    PanelFilter,
    ShTable,
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload
  },

  setup() {
    const activeStatus = ref([
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
    ])
    const {
      pageLength,
      allSkuGroups,
      getAllSkuGroups,
      dataTableLength,
      page,
      skuGroupsHeader,
      item,
      filterField,
      skuGroupLoading
    } = Sku();

    return {
      pageLength,
      allSkuGroups,
      getAllSkuGroups,
      dataTableLength,
      page,
      skuGroupsHeader,
      item,
      filterField,
      skuGroupLoading,
      activeStatus
    };

  },

  data() {
    return {
      perPageFilter: false,
      itemListTable:[],
      removeTableItem: {
        text: "آیا از حذف آیتم مطمئن هستید؟",
        title: "حذف آیتم",
        path: "product/sku/group/crud/delete/",
      },
    }
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    },
  },

  mounted() {
    this.getAllSkuGroups();
  },

  methods: {
    changeHeaderShow(index, value) {
      this.skuGroupsHeader[index].show = value
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
    allSkuGroups(){
      this.itemListTable = []

      this.allSkuGroups.data.forEach((item) =>
          this.itemListTable.push(
              {
                product_id : item.product_id,
                id: item.id,
                name: item.name,
                label: item.label,
              },
          ),
      )
    },

    $route() {
      this.getAllSkuGroups()
    },

    confirmModal(val) {
      if (localStorage.getItem('deleteObject')) {
        if (!val) {
          this.getAllSkuGroups()
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
        this.getAllSkuGroups()
      }
    }
  }
}
</script>
