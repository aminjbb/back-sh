<template>

  <div ref="addWarehouseExitCapacity"  class="create-product__info-form scroller">
    <v-row justify="center" align="center">
      <v-col cols="12">
          <div class="text-center">
            <span>
              سفارش مرجوع شده
            </span>
            <v-divider class="my-5"/>
          </div>
      </v-col>
      <v-col cols="12">
        <template v-if="orderDetail">
          <div class="text-center">
            <div class="my-10">
              <v-icon size="50">
                mdi-barcode-scan
              </v-icon>
            </div>
            <span class="t20400">
              برای شروع عملیات فاکتور را اسکن کنید
            </span>
          </div>
        </template>
        <template v-else>
          <v-row>
            <v-col v-for="shps in shpsList" cols="4" :key="`open_order${shps.shps}`">
              <v-card @click="openOrderModal(shps.shps , shps?.barcode)" min-height="250" max-height="400" rounded >
                <div class="pa-2">
                  <v-icon :color="shps.done ? 'success':'warning'">mdi-circle</v-icon>
                </div>
                <div class="d-flex justify-center py-5">
                  <img src="@/assets/img/productImge.png" width="100" height="100" alt="">
                </div>
                <div class="d-flex justify-space-evenly py-5">
                  <span class="t14400">
                     کد محصول:
                  </span>
                  <span class="t16400">
                   {{ shps?.shps }}
                  </span>
                </div>
                <div class="d-flex justify-center mb-5">
                  <span class="t14400 number-font">
                      کرم ضد آفتاب شنل 12 میل
                  </span>
                </div>
                <div class="d-flex justify-center mb-5">
                  <span class="t14400 text-primary500 number-font">
                     کالا خط و خش دارد
                  </span>
                </div>
              </v-card>
            </v-col>

          </v-row>
        </template>
      </v-col>
    </v-row>
    <ModalOpenOrder :checkDone="checkDone"/>
  </div>

</template>
<script>
import {AxiosCall} from "@/assets/js/axios_call";
import ModalOpenOrder from "@/components/Warehouse/OpenOrder/ModalOpenOrder.vue";
export default {
  components: {ModalOpenOrder},

  data() {
    return {
      orderDetail : null,
      shpsList:[
        {
          shps:12,
          done:false,
          barcode:'12-1212-123123123'
        },
        {
          shps:12,
          done:false,
          barcode:'12-1212-123143123'
        },
        {
          shps:12,
          done:false,
          barcode:'12-1212-126143123'
        },
        {
          shps:13,
          done:false,
          barcode:'12-1212-126143193'
        }
      ]
    }
  },
  computed:{
    doneObject() {
      return this.$store.getters['get_returnedOrderItems']
    }
  },
  methods: {
    checkDone(shps){
      console.log(this.doneObject)
     const shpsItems = this.doneObject.filter(shpsItem=>shpsItem.object?.shps == shps)
     const shpsSelected = this.shpsList.filter(element=>element?.shps == shps)

      console.log(shpsItems)
      shpsItems.forEach((element, index) => {
        shpsSelected[index].done = true
      })
    },
    openOrderModal(shps ,barcode){
      const form = {
        dialog: true,
        object:{
          barcode: barcode,
          shps:shps
        }
      }
      this.$store.commit('set_openOrderModal', form)
    },
    /**
     * validate addWarehouseExitCapacity form
     */
    async validate(){
      await this.$refs.addWarehouseExitCapacity.validate()
      if (this.valid) await this.addExitSpecialCapacity()
      this.loading = false
    },

    async addExitSpecialCapacity(){
      this.loading=true
      const startDate = convertDateToGregorian(this.form.date[0] , '-' , false)
      const endDate = convertDateToGregorian(this.form.date[1] , '-' , false)
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      formData.append('start_date' , startDate)
      formData.append('end_date' , endDate)
      formData.append('count', this.form.capacity)
      AxiosMethod.using_auth = true
      AxiosMethod.form = formData
      AxiosMethod.token = this.$cookies.get('adminToken')
      AxiosMethod.end_point = `warehouse/exit/storage/exception/crud/create/${this.$route.params.warehouseId}`
      let data = await AxiosMethod.axios_post()
      if (data){
        this.getWarehouseExitCapacityList(1)
      }

    }
  },

}
</script>

<style>
@import url("@neshan-maps-platform/vue3-openlayers/dist/style.css");
</style>
