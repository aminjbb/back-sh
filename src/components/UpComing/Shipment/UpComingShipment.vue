<template>
  <div class="h-100 d-flex flex-column align-stretch ticket__dashboard">
    <v-card height="150" class="ma-5 br-12 stretch-card-header-90">
      <v-row
          justify="start"
          align="center"
          class="px-10 py-5">
        <v-col cols="5">
          <div class="text-right ">
                        <span class="text-gray600 t14500">
                            شناسه بسته
                        </span>
            <span class="text-error">
                            *
                        </span>
          </div>
          <div>
            <v-text-field
                @keyup="setpackId()"
                variant="outlined"
                :rules="rule"
                :autofocus="true"
                v-model="boxId"/>
          </div>
        </v-col>
        <v-col cols="3">
          <div class="d-flex justify-start pt-5">
            <v-btn
                color="primary500"
                :loading="loadingPackage"
                @click="packageUpdate()"
                :disabled="!boxId"
                height="40"
                rounded
                class="px-8 mt-1">
              تکمیل ظرفیت بسته
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">

      <Table
          ref="processingShipmentShps"
          class="flex-grow-1"
          :header="headerShpsSellerUpcoming"
          :items="shipmentShpsList"
          editUrl=""
          activePath=""
          deletePath=""
          changeStatusUrl=""
          updateSkuUrl=""
          :loading="loading"
          updateUrl="seller/csv/mass-update"
          model="processingShipmentShps"/>
      <v-divider/>
      <v-card-actions class="pb-3">
        <v-row class="px-8">
          <v-col cols="3" class="d-flex justify-start"/>

          <v-col cols="6" class="d-flex justify-center"/>

          <v-col cols="3" class="d-flex justify-end">
            <div class="d-flex align-center">
              <v-btn
                  :loading="finishLoading"
                  rounded
                  variant="text"
                  width="115"
                  @click="finishedPack()">
                            <span class="t14300">
                                اتمام محموله
                            </span>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <WarningTerolance/>
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
      headerShpsSellerUpcoming
    } = ProcessingShipment();

    return {
      processingShipment,
      filterField,
      header,
      loading,
      headerShps,
      getShipmentShpslist,
      shipmentShpsList,
      headerShpsSellerUpcoming
    };
  },
  components: {
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
      rule: [v => !!v || 'این فیلد الزامی است']
    }
  },
  methods: {
    setpackId() {
      if (this.boxId.includes('-')) {
        const cargoSplit = this.boxId.split('-')
        if (cargoSplit[1]) localStorage.setItem('packId', cargoSplit[1])
        else localStorage.setItem('packId', this.boxId)
      } else localStorage.setItem('packId', this.boxId)

    },
    async packageUpdate() {
      try {
        let packageId = null
        if (this.boxId.includes('-')) {
          const cargoSplit = this.boxId.split('-')
          if (cargoSplit[1]) packageId = cargoSplit[1]
          else packageId = this.boxId
        } else packageId = this.boxId
        this.loadingPackage = true
        var formData = new FormData();
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = `package/complete/${packageId}`
        AxiosMethod.store = this.$store
        AxiosMethod.using_auth = true
        AxiosMethod.token = this.$cookies.get('adminToken')
        let data = await AxiosMethod.axios_post()
        if (data) {
          this.loadingPackage = false
          openToast(this.$store, 'بسته با موقیت ویرایش شد', 'success')
        } else {
          this.loadingPackage = false
        }
      } catch (e) {
        this.loadingPackage = false
      }
    },
    async finishedPack() {
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
  },

}
</script>
