<template>
  <v-layout class="bg-gray">
    <DashboardLayout/>
    <v-main class="h-100vh">
      <Header/>
      <!--      <WalletUser />-->
      <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
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
            </v-col>

            <v-col cols="6">
              <v-row justify="end">
                <ModalColumnFilter
                    :changeHeaderShow="changeHeaderShow"
                    :header="header"
                />

                <PanelFilter
                    @resetPage="resetPage"
                    :path="`wallet/index`"
                    :filterField="filterField"
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
              :items="itemsList"
              :loading="loading"
              :page="page"
              :perPage="dataTableLength">
            <template v-slot:customSlot="item">
                <v-chip :color="statusColor(item.data.status)">
                  {{item.data.status}}
                </v-chip>
            </template>

            <template v-slot:actionSlot="item">
              <div class="text-center">
                <v-icon :id="`menuActions${item.index}`" class="pointer mx-auto" >
                  mdi-plus
                </v-icon>
              </div>

              <v-menu :activator="`#menuActions${item.index}`" :close-on-content-click="false" >
                <v-list class="c-table__more-options">
                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push(`/seller-cartable/${item.data.id}/requests`)">
                        <v-icon class="text-grey-darken-1">mdi-text-box-multiple-outline</v-icon>
                        <span class="mr-2 text-grey-darken-1 t14300">
                                        مشاهده درخواست ها
                                  </span>
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
                <ModalExcelDownload getEndPoint="user/csv/get/export"/>
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
import {defineAsyncComponent} from "vue";

const ModalExcelDownload = defineAsyncComponent(() => import ('@/components/Public/ModalExcelDownload.vue'))
const ModalColumnFilter = defineAsyncComponent(() => import ('@/components/Public/ModalColumnFilter.vue'))
const ShTable = defineAsyncComponent(() => import ('@/components/Components/Table/sh-table.vue'))
const PanelFilter = defineAsyncComponent(() => import ('@/components/PanelFilter/PanelFilter.vue'))
const DashboardLayout = defineAsyncComponent(() => import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(() => import ('@/components/Public/Header.vue'))
import SellerCartable from '@/composables/SellerCartable.js'

export default {
  setup() {
    const {
      pageLength, filterField,
      dataTableLength, page, header,
      loading, sellers, sellerRequests,
      getSellersRequest, isFilterPage
    } = new SellerCartable()
    return {
      pageLength, filterField,
      dataTableLength, page, header,
      loading, sellers, sellerRequests,
      getSellersRequest, isFilterPage
    }
  },
  components: {
    ModalExcelDownload,
    ModalColumnFilter,
    ShTable,
    PanelFilter,
    DashboardLayout,
    Header,
  },
  computed:{
    itemsList(){
      try {
        const items = []
        this.sellers.forEach(element=>{
          const form ={
            id:element.id,
            shopping_name:element.shopping_name,
            seller:element.name,
            status:element.status,
            seller_type : element.type === 'legal' ? 'حقیقی' : 'حقوقی' ,
            updated_at_fa :element.updated_at_fa,
            request_count : element.request_count
          }
          items.push(form)
        })
        return items
      }
      catch (e) {
        return []
      }
    }
  },
  methods:{
    statusColor(status){
     return  status === 'در انتظار بررسی' ? 'Orange600' : 'Purple500'
    },
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },

    resetPage(){
      this.perPageFilter = true
      this.page = 1
      setTimeout(()=>{
        this.perPageFilter = false
      }, 1000)
    },
  },

  mounted() {
    this.getSellersRequest()
  }
}
</script>