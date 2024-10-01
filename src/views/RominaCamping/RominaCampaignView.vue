<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
        <v-card height="70" class="ma-5 br--12 stretch-card-header-70 rounded-lg">
          <v-row
              justify="center"
              align="center"
              class="px-10 py-5">
            <v-col cols="12">
              <v-row justify="end">
                <ModalColumnFilter
                    :changeHeaderShow="changeHeaderShow"
                    :header="header" />

                <PanelFilter
                    @resetPage="resetPage"
                    path="romina-campaign/index"
                    :filterField="filterField"
                    :page="page"
                    :perPage="dataTableLength"/>
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <ShTable
              class="flex-grow-1"
              :headers="header"
              :items="itemListTable"
              :page="page"
              :perPage="dataTableLength"
              :loading="loading">

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
                      <div class="ma-5 pointer" @click="$router.push(`/admin/edit/${item.data.id}`)">
                        <v-icon size="small" class="text-grey-darken-1">
                          mdi-printer-outline
                        </v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">پرینت برچسب ارسال</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <div class="ma-5 pointer" @click="$router.push(`/admin/edit/${item.data.id}`)">
                        <v-icon size="small" class="text-grey-darken-1">
                          mdi-eye-outline
                        </v-icon>
                        <span class="mr-2 text-grey-darken-1 t14 w300">نمایش جزییات ارسال
                          <DetailsModal />
                        </span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>

                </v-list>
              </v-menu>
            </template>
          </ShTable>
          <Modal
              ref="groupPrintModal"
              :title="`پرینت گروهی برچسب ارسال`"
              width="468"
              @successAction="confirmedGroupPrint()"
              @cancelAction="closeModalGroupPrint()">
            <template v-slot:modalBody>
              <div class="text-right mb-1">
                <span class="text-scanError mr-1">*</span>
                <span class="t12 w400 text-gray600">تعداد برچسب </span>
              </div>
              <div class="mb-4">
                <v-text-field
                    v-model="label_count"
                    variant="outlined"/>
              </div>
            </template>

          </Modal>
          <v-divider />

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
    </v-main>
  </v-layout>
</template>

<script>
import {defineAsyncComponent} from "vue";

const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
const PanelFilter = defineAsyncComponent(()=> import('@/components/PanelFilter/PanelFilter.vue'))
import Campaign from "@/composables/Campaign";

import ModalColumnFilter from "@/components/Public/ModalColumnFilter.vue";
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import ShTable from "@/components/Components/Table/sh-table.vue";
import {convertDateToJalai} from "@/assets/js/functions";
import Modal from "@/components/Components/Modal/Modal.vue";
import DetailsModal from "@/components/Orders/Modal/DetailsModal.vue";

export default {
  name: "RominaCampingView",
  components: {
    DetailsModal,
    Modal,
    ShTable,
    ModalExcelDownload,
    ModalColumnFilter,
    DashboardLayout,
    Header,
    PanelFilter
  },

  setup() {
    const {
      header,
      pageLength,
      dataTableLength,
      page,
      loading,
      getRominaCampaignList,
      rominaList,
      filterField
    } = Campaign()

    return {
      header,
      pageLength,
      dataTableLength,
      page,
      loading,
      getRominaCampaignList,
      rominaList,
      filterField
    }
  },

  data() {
    return {
      perPageFilter:false,
      itemListTable: [],
      label_count: null
    }
  },

  mounted() {
    this.getRominaCampaignList()
  },

  methods: {
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

    openModalGroupPrint(){
      this.$refs.groupPrintModal.dialog = true
    },

    closeModalGroupPrint(){
      this.$refs.groupPrintModal.dialog = false
    },

    confirmedGroupPrint() {
      console.log('confirmed')
    }

  },

  watch: {
    // rominaList() {
    //   this.itemListTable = []
    //
    //   this.rominaList.forEach((item) =>
    //       this.itemListTable.push(
    //           {
    //             id: item.id,
    //             order_id:item,
    //             order_number: item.order_number ? item.order_number : '-',
    //             user: item.user ? item.user.first_name +' '+ item.user.last_name : '-',
    //             phone_number: item.user.phone_number ? item.user.phone_number : '-',
    //             packed_status: item.packed_status === 1 ? 'mdi-check-bold|success' : 'mdi-close-thick|error',
    //             new_sending_method: item,
    //             submit_date_fa: item.submit_date_fa +' '+ item.submit_date.split(' ')[1],
    //             send_date_fa: item.submit_date_fa +' '+ item.submit_date.split(' ')[1],
    //             logistic_date_fa: item.submit_date_fa +' '+ item.submit_date.split(' ')[1],
    //             state:item,
    //             city:item,
    //             label:item
    //           },
    //       ),
    //   )
    // },

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

    $route(){
      this.getRominaCampaignList()
    },

    page(){
      if (!this.perPageFilter){
        this.getRominaCampaignList()
      }
    }
  }
}
</script>

<style scoped>

</style>