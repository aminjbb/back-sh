<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main  class="h-100vh">
      <Header/>
      <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
        <v-card height="150" class="ma-5 br--12 stretch-card-header-90">
          <v-row
              justify="start"
              align="center"
              class="px-10 py-5">
            <v-col cols="4">
              <div class="text-right ">
            <span class="text-gray600 t14 w500">
             شناسه کالا
            </span>
                <span class="text-error">
              *
            </span>
              </div>
              <div>
                <v-text-field
                    @keyup.enter="filterShps()"
                    variant="outlined"
                    v-model="barcodeShps"/>
              </div>
            </v-col>

            <v-col cols="3">
              <div class="d-flex justify-start pt-5">
                <v-btn
                    color="primary500"
                    :loading="loadingPackage"
                    @click="filterShps()"
                    height="40"
                    rounded
                    class="px-8 mt-1">
                  ثبت
                </v-btn>
              </div>
            </v-col>
            <v-col v-if="shipmentType === 'seller'" cols="5">
              <div class="text-right">
                        <span class="text-gray600 t14 w500">
                            شناسه کالا
                        </span>
              </div>
              <div>
                <v-text-field
                    @keyup.enter="packedShpss()"
                    variant="outlined"
                    :rules="rule"
                    :autofocus="shpssFocus"
                    v-model="boxId"/>
              </div>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="mx -5 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">

          <Table
              :getShipmentShpslist="getShipmentShpslist"
              ref="processingShipmentShps"
              class="flex-grow-1"
              :header="headerTable"
              :items="shipmentShpsListFilterd"
              editUrl=""
              activePath=""
              deletePath=""
              changeStatusUrl=""
              updateSkuUrl=""
              :packId="packId"
              :loading="loading"
              updateUrl="seller/csv/mass-update"
              :model="shipmentType"/>
          <v-divider />
          <div class="pb-3 d-block" style="height: 60px">
            <v-row align="center" class="pt-2 px-3">
              <v-col cols="4">
                جمع:
              </v-col>
              <v-col cols="1" class="mr-12 pr-8">
            <span class="t12 w500 text-black number-font">
              {{ sumRequestCount }}
            </span>
              </v-col>
              <v-col cols="1" class="pr-5">
            <span class="t12 w500 text-black number-font">
              {{ sumMinToleranceCount }}
            </span>
              </v-col>
              <v-col cols="1" class="pr-2">
            <span class="t12 w500 text-black number-font">
              {{ sumMaxToleranceCount }}
            </span>
              </v-col>
              <v-col cols="1" class="pr-0">
            <span class="t12 w500 text-black number-font">
              {{ sumRemainedCount }}
            </span>
              </v-col>
              <v-col cols="3" class="d-flex justify-end">
                <v-btn
                    :loading="finishLoading"
                    rounded
                    variant="outlined"
                    width="115"
                    @click="finishedPack()">
                  <span class="t14 w300">اتمام شمارش</span>
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card>
        <WarningTerolance ref="WarningTerolance"/>
      </div>

    </v-main>
  </v-layout>
</template>

<script >
import {defineAsyncComponent} from "vue";
const DashboardLayout = defineAsyncComponent(()=> import ('@/components/Layouts/DashboardLayout.vue'))
const Header = defineAsyncComponent(()=> import ('@/components/Public/Header.vue'))
import Table from "@/components/ProcessingShipment/Table/Table.vue";
import WarningTerolance from "@/components/ProcessingShipment/Modal/WarningTerolance.vue";
import ProcessingShipment from "@/composables/ProcessingShipment";
import {
  AxiosCall
} from "@/assets/js/axios_call";
import {openToast} from "@/assets/js/functions";
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";
import axios from "axios";

export default {
  setup() {
    const {
      processingShipment,
      filterField,
      header,
      loading,
      headerShps,
      getShipmentShpslist,
      shipmentShpsList,
      headerShpsSeller
    } = ProcessingShipment();

    return {
      processingShipment,
      filterField,
      header,
      loading,
      headerShps,
      getShipmentShpslist,
      shipmentShpsList,
      headerShpsSeller
    };
  },
  components: {
    ModalExcelDownload,
    Table,
    WarningTerolance,
    Header,
    DashboardLayout
  },
  mounted() {
    this.getShipmentShpslist()
  },
  data() {
    return {
      boxId: null,
      loadingPackage: false,
      finishLoading: false,
      rule: [v => !!v || 'این فیلد الزامی است'],
      packId: null,
      packageFocus: true,
      shpssFocus: true,
      shipmentShpsListFilterd: [],
      barcodeShps: null,
      url: import.meta.env.VITE_API_BASEURL,
    }
  },
  methods: {
    async packedShpss() {
      try {
        this.finishLoading = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `shipment/pack/${this.$route.params.shipmentId}`
        AxiosMethod.store = this.$store
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.finishLoading = false
          this.$router.go(-1)
        } else {
          this.finishLoading = false
        }
      } catch (e) {
        this.finishLoading = false
      }
    },
    async filterShps() {
      if (this.barcodeShps && this.barcodeShps !== "") {
        const filterData = this.shipmentShpsListFilterd.find(element => {
          return element.barcode == this.barcodeShps
        })

        if (filterData) {
          this.shipmentShpsListFilterd = []

          this.shipmentShpsListFilterd.push(filterData)
        } else {
          openToast(this.$store, 'شناسه کالا وجود ندارد')
        }

      } else {
        this.shipmentShpsListFilterd = this.shipmentShpsList
      }

    },

    async finishedPack(){
      await axios.post(`${this.url}/v1/shipment/shps/count/${this.$route.params.shipmentId}/done?approved=0`, {},{
        headers: {
          Authorization:
              "Bearer " + this.$cookies.get('adminToken'),
        },})
          .then((response) => {
            this.finishLoading = false
            this.$router.go(-1)
          })
          .catch((err) => {
            if (err.response.status === 409) {
              this.finishLoading = false
              this.$refs.WarningTerolance.dialog = true
            }
            else {
              openToast(this.$store , err.message , 'error')

            }
          })
    }
  },
  computed: {
    sumRequestCount(){
      let sum =0
      this.shipmentShpsListFilterd.forEach(shps=>{
        sum += parseInt(shps.requested_count)
      })
      return sum
    },
    sumMinToleranceCount(){
      let sum =0
      this.shipmentShpsListFilterd.forEach(shps=>{
        sum += parseInt(shps.min_tolerance)
      })
      return sum
    },
    sumMaxToleranceCount(){
      let sum =0
      this.shipmentShpsListFilterd.forEach(shps=>{
        sum += parseInt(shps.max_tolerance)
      })
      return sum
    },
    sumRemainedCount(){
      let sum =0
      this.shipmentShpsListFilterd.forEach(shps=>{
        sum += parseInt(shps.left_over_count)
      })
      return sum
    },
    headerTable() {
      try {
        if (this.shipmentShpsList[0].max_tolerance) return this.headerShps
        return this.headerShpsSeller
      } catch (e) {
        return this.headerShps
      }
    },
    shipmentType() {
      try {
        if (this.shipmentShpsList[0].max_tolerance) return 'shavaz'
        return 'seller'
      } catch (e) {
        return 'shavaz'
      }
    }
  },
  watch: {
    barcodeShps(value) {
      if (value === '' || !value) {
        this.shipmentShpsListFilterd = this.shipmentShpsList
      }
    },
    shipmentShpsList() {
      this.shipmentShpsListFilterd = this.shipmentShpsList
    }
  }
}
</script>