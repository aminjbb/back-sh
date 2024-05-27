<template>
  <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
    <v-card height="150" class="ma-5 br-12 stretch-card-header-90">
      <v-row
          justify="start"
          align="center"
          class="px-10 py-5">
        <v-col cols="4">
          <div class="text-right ">
            <span class="text-gray600 t14500">
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
                        <span class="text-gray600 t14500">
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

    <v-card class="mx -5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">

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
            <span class="t12500 text-black number-font">
              {{ sumRequestCount }}
            </span>
          </v-col>
          <v-col cols="1" class="pr-5">
            <span class="t12500 text-black number-font">
              {{ sumMinToleranceCount }}
            </span>
          </v-col>
          <v-col cols="1" class="pr-2">
            <span class="t12500 text-black number-font">
              {{ sumMaxToleranceCount }}
            </span>
          </v-col>
          <v-col cols="1" class="pr-0">
            <span class="t12500 text-black number-font">
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
              <span class="t14300">اتمام شمارش</span>
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card>
    <WarningTerolance ref="WarningTerolance"/>
  </div>
</template>

<script>
import Table from "@/components/ProcessingShipment/Table/Table.vue";
import WarningTerolance from "@/components/ProcessingShipment/Modal/WarningTerolance.vue";
import ProcessingShipment from "@/composables/ProcessingShipment";
import {
  AxiosCall
} from "@/assets/js/axios_call";
import {openToast} from "@/assets/js/functions";
import ModalExcelDownload from "@/components/Public/ModalExcelDownload.vue";

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
    WarningTerolance
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
      barcodeShps: null
    }
  },
  methods: {
    async finishedPack() {
      try {
        this.finishLoading = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `shipment/shps/count/${this.$route.params.shipmentId}/done?approved=0`
        AxiosMethod.store = this.$store
        AxiosMethod.toast_error = true
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.finishLoading = false
          this.$router.go(-1)
        } else {
          this.finishLoading = false
          this.$refs.WarningTerolance.dialog = true
        }
      } catch (e) {
        this.finishLoading = false
      }
    },
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

    }
  },
  computed: {
    sumRequestCount(){
      let sum =0
      this.shipmentShpsListFilterd.forEach(shps=>{
        sum += parseInt(shps.shps_count)
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
        sum += parseInt(shps.remained_count)
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
