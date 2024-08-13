<template>
  <v-layout class="bg-gray">
    <DashboardLayout />
    <v-main class="h-100vh">
      <Header />
<!--      <AssignShpsToPackageAcceptList/>-->
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
                <span class="text-gray600 t14 w500">شناسه بسته</span>
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
                <span class="text-gray600 t14 w500">شناسه کالا</span>
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
        <v-card class="mx-5 mt-5 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
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
                  <span class="t14 w300">اتمام محموله</span>
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
// import AssignShpsToPackageAcceptList from '@/components/AssignShpsToPackageAccept/AssignShpsToPackageAcceptList.vue'
import Table from "@/components/AssignShpsToPackageAccept/Table/Table.vue"
import { openToast } from "@/assets/js/functions"
import ProcessingShipment from "@/composables/ProcessingShipment"
import { AxiosCall } from "@/assets/js/axios_call"

export default {
  data() {
    return {
      shipmentId: null,
      barcodeShps: null,
      boxId: null,
      packId: null,

      packageFocus: true,
      finishLoading: false,
      loadingPackage: false,
      loading: false,

      shipmentShpsListFilterd: [],
      rule: [v => !!v || 'این فیلد الزامی است'],
    }
  },
  setup() {
    const {
      headerAssignShpsToPackageAccept,
      assignShpsAcceptList,
      getAssignShpsAcceptList
    } = ProcessingShipment()

    return {
      headerAssignShpsToPackageAccept,
      assignShpsAcceptList,
      getAssignShpsAcceptList,
    }
  },

  components: { Table, DashboardLayout, Header },

  computed: {
    setPackId() {
      if (this.boxId.includes('-')) {
        const cargoSplit = this.boxId.split('-')
        if (cargoSplit[1]) this.packId = cargoSplit[1]
        else this.packId = this.boxId
      } else this.packId = this.boxId
    },

    sumRequestCount(){
      let sum =0
      this.assignShpsAcceptList.forEach(shps=>{
        sum += parseInt(shps.left_over_count)
      })
      return sum
    }
  },

  methods: {
    async packageUpdate() {
      try {
        let packageId = null
        if (this.boxId.includes('-')) {
          const cargoSplit = this.boxId.split('-')
          if (cargoSplit[1]) packageId = cargoSplit[1]
          else packageId = this.boxId
        } else packageId = this.boxId
        this.loadingPackage = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `package/complete/${packageId}`
        AxiosMethod.store = this.$store
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.loadingPackage = false
          openToast(this.$store, 'بسته با موقیت ویرایش شد', 'success')
        }
        else {
          this.loadingPackage = false
        }
      }
      catch (e) {
        this.loadingPackage = false
      }
    },

    async finishedPack() {
      try {
        this.finishLoading = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `shipment/pack/${this.$route.params.shipmentId}`
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
        }
      } catch (e) {
        this.finishLoading = false
      }
    },

    async filterShps() {
      if (this.barcodeShps && this.barcodeShps !== "") {
        const filterData = this.assignShpsAcceptList.find(element => {
          return element.barcode === this.barcodeShps
        })
        if (filterData) {
          this.assignShpsAcceptList = []
          this.assignShpsAcceptList.push(filterData)
        } else {
          openToast(this.$store, 'شناسه کالا وجود ندارد')
        }

      } else {
        this.shipmentShpsListFilterd = this.assignShpsAcceptList
      }

    }
  },

  mounted() {
    this.getAssignShpsAcceptList()
  }
}
</script>
