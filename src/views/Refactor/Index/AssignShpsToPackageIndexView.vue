<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
      <div class="h-100 d-flex flex-column align-stretch seller">
        <v-card max-height="400" class="mx-5 pb-15">
          <div class="text-center my-3">
            <span>شناسه بسته</span>
          </div>
          <v-divider/>
          <v-row
              justify="space-around"
              align="center"
              class="px-10 my-5">
            <v-col cols="6">
              <div class="text-right">
                <span class="text-gray600 t14500">شناسه بسته</span>
                <span class="text-error">*</span>
              </div>
              <div class="d-flex align-center">
                <v-text-field
                    @keyup="setPackId()"
                    variant="outlined"
                    :rules="rule"
                    :autofocus="packageFocus"
                    v-model="boxId"/>
                <v-btn
                    color="primary500"
                    :loading="loadingPackage"
                    @click="packageUpdate()"
                    :disabled="!boxId"
                    height="40"
                    rounded
                    class="px-8 mr-1">
                  تکمیل ظرفیت بسته
                </v-btn>
              </div>
            </v-col>

            <v-col cols="6">
              <div class="text-right">
                <span class="text-gray600 t14500">شناسه کالا</span>
                <span class="text-error">*</span>
              </div>
              <div class="d-flex align-center">
                <v-text-field
                    variant="outlined"
                    v-model="barcodeShps"/>
                <v-btn
                    color="primary500"
                    :loading="loadingPackage"
                    @click="filterShps()"
                    height="40"
                    rounded
                    class="px-8 mr-1">
                  ثبت
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="mx-5 mt-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
          <Table
              :getShipmentShpslist="getAssignShpsAcceptList"
              ref="processingShipmentShps"
              class="flex-grow-1"
              :header="headerAssignShpsToPackageAccept"
              :items="assignShpsAcceptList"
              :packId="packId"
              :loading="loading"
              updateUrl="seller/csv/mass-update" />
          <v-divider />
          <div class="pb-3 d-block" style="height: 60px">
            <v-row align="center" class="pt-2 px-3">
              <v-col cols="7">
                جمع:
              </v-col>
              <v-col cols="1" class="mr-12 pr-8">
            <span class="t12 w500 text-black number-font">
              {{ sumRequestCount }}
            </span>
              </v-col>
              <v-col cols="3" class="d-flex justify-end">
                <v-btn
                    :loading="finishLoading"
                    rounded
                    variant="outlined"
                    width="115"
                    @click="finishedPack()">
                  <span class="t14300">اتمام محموله</span>
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </div>
    </v-main>
  </v-layout>
</template>

<script >
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'
import Header from '@/components/Public/Header.vue'
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
    Header,
    DashboardLayout
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