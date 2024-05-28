<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card max-height="400" class="mx-5   pb-15">
      <div class="text-center my-3">
        <span>
          پردازش محموله
        </span>
      </div>
      <v-divider/>
      <v-row align="center" class="px-3 my-5">
        <v-col cols="6">
          <div class="text-right ">
                      <span class="text-gray600 t14500">
                          شناسه محموله
                      </span>
            <span class="text-error">
                          *
                      </span>
          </div>
          <div>
            <v-text-field

                variant="outlined"
                :rules="rule"
                :autofocus="true"
                v-model="shipmentId"/>
          </div>
        </v-col>
        <v-col cols="6">
          <v-row>
            <ModalDetaiShipment :shipmentId="splitShipmentId" class="ml-2 mt-4"/>
            <v-btn
                :loading="loading"
                :disabled="!splitShipmentId"
                @click="validate()"
                color="primary500"
                height="40"
                rounded
                class="px-8 mt-5">
              پردازش
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 py-5">
        <v-col cols="6" />

        <v-col cols="6">
          <v-row justify="end">
            <ModalColumnFilter :changeHeaderShow="changeHeaderShow" :header="header" />

            <PanelFilter @resetPage="resetPage" path="up-coming/index" :filterField="filterField" :statusItems="statusItems"/>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <Table
          :getShipmentRequestsList="getUpComingList"
          class="flex-grow-1"
          :header="header"
          :items="upComingList?.data"
          :page="page"
          :perPage="dataTableLength"
          activePath="page/crud/update/activation/"
          :loading="loading"
          updateUrl="page/csv/mass-update"
          model="page" />

      <v-divider />

      <v-card-actions class="pb-3">
        <v-row class="px-8">
          <v-col cols="3" class="d-flex justify-start">
            <ModalExcelDownload getEndPoint="cargo/csv/requested/cargo/export" />
          </v-col>

          <v-col cols="6" class="d-flex justify-center">
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

          <v-col cols="3" class="d-flex justify-end">
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
import Table from '@/components/UpComing/Table/Table.vue'
import UpComing from "@/composables/UpComing"
import ModalColumnFilter from '@/components/Public/ModalColumnFilter.vue'
import ModalGroupAdd from '@/components/Public/ModalGroupAdd.vue'
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue"
import { openToast} from "@/assets/js/functions"
import PanelFilter from "@/components/PanelFilter/PanelFilter.vue"
import ModalDetaiShipment from "@/components/ProcessingShipment/Modal/ModalDetaiShipment.vue";
export default {
  data() {
    return {
      perPageFilter:false,
      loading: false,
      shipmentId: null,
      rule: [v => !!v || 'این فیلد الزامی است'],
      valid: true
    }
  },
  setup() {
    const statusItems= [
      {
        label: 'در انتظار',
        value: 'waiting',
      },
      {
        label: 'در حال بررسی',
        value: 'in_review',
      },
      {
        label: 'رد شده',
        value: 'rejected',
      }
    ]
    const {
      pageLength,
      filterField,
      upComingList,
      getUpComingList,
      dataTableLength,
      page,
      header,
      loading
    } = UpComing();
    return {
      pageLength,
      filterField,
      upComingList ,
      getUpComingList,
      dataTableLength,
      page,
      header,
      loading,
      statusItems
    }
  },

  components: {
    ModalDetaiShipment,
    PanelFilter,
    Table,
    ModalGroupAdd,
    ModalColumnFilter,
    ModalExcelDownload,
  },

  computed: {
    confirmModal() {
      return this.$store.getters['get_confirmForm'].confirmModal
    },
    splitShipmentId() {
      try {
        const splitData = this.shipmentId.split('-')
        if (splitData[1]) return splitData[1]
        else {
          return this.shipmentId
        }
      }
      catch (e) {
        return ''
      }
    }
  },

  methods: {
    changeHeaderShow(index, value) {
      this.header[index].show = value
    },

    validate() {
      this.$router.push(`/processing-shipment/${this.splitShipmentId}/shps-list`)
    },
  },

  mounted() {
    this.getUpComingList();
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
        this.getUpComingList()
      }
    },
    confirmModal(val) {
      if (this.$cookies.get('deleteItem')) {
        if (!val) {
          this.getPageList();
          openToast(
              this.$store,
              'صفحه مورد نظر با موفقیت حذف شد',
              "success"
          );
          this.$cookies.remove('deleteItem')
        }
      }
    },
    $route(to){
      this.getUpComingList(to);
    }
  }
}
</script>
