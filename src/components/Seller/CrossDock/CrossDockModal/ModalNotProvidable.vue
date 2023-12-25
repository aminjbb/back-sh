<template>
  <div class="text-right">

    <v-dialog
        v-model="dialog"
        width="508"
    >
      <v-card>
        <v-row justify="space-between" align="center" class="pa-5">
          <v-col cols="2">
            <v-btn @click="close()" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7">
            <div class="text-left pl-5">
              <span class="t14500">
                           عدم توانایی تامین
              </span>
            </div>
          </v-col>
        </v-row>
        <div class="mt-3 mb-8  px-5">
          <v-divider/>
        </div>
        <div class="text-center px-5" >
          <v-row justify="center" align="center">
            <v-col cols="11">
              <div class="text-right my-5">
                <span class="t14500">
                  تعداد کالا
                  <span class="text-error">
                    *
                  </span>
                </span>
              </div>
              <v-text-field
                  variant="outlined"
                  single-line
                  v-model="count"
                  type="number"
              />
            </v-col>

          </v-row>
        </div>

        <div class="mt-3 mb-8 px-5">
          <v-divider />
        </div>

        <div class="d-flex justify-space-between pb-5 px-10">
          <v-btn
              width="80"
              :disabled="!count"
              @click="notProvidable()"
              color="primary500"
              :loading="loading"
              height="40"
              rounded
              class="px-8 mt-1">
            تایید
          </v-btn>
          <v-btn
              @click="close()"
              variant="text"
              height="40"
              rounded
              class="px-5 mt-1"
          >

            انصراف
          </v-btn>

        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {AxiosCall} from "@/assets/js/axios_call";
import Warehouse from "@/composables/Warehouse"
import {convertDateToJalai, openToast} from "@/assets/js/functions";
export  default {
  setup(){
    const {getWarehouseList ,  warehouseList} = new Warehouse()
    return {getWarehouseList ,  warehouseList}
  },
  props:{
    getOrders:{type:Function},
  },
  components:{

  },
  data(){
    return{
      loading:false,
      count:''

    }
  },

  methods:{
    convertDateToJalai,
    close(){
      const form = {
        dialog :false,
        id : ''
      }
      this.$store.commit('set_notProvidableModal' , form)
    },

    async notProvidable(){
      this.loading=true
      let formData = new FormData();
      const AxiosMethod = new AxiosCall()
      AxiosMethod.end_point = `seller/${this.$route.params.sellerId}/orders/submit/not/providable/`
      formData.append('order_id' , this.crossDockId.order_id)
      formData.append('shps' , this.crossDockId.shps)
      formData.append('count', this.count)
      AxiosMethod.form = formData
      AxiosMethod.store = this.$store
      AxiosMethod.using_auth =true
      AxiosMethod.token =this.$cookies.get('adminToken')
      let data = await AxiosMethod.axios_post()
      if (data) {
        this.loading=false
        this.getOrders()
        this.close()
      }
      else{
        this.loading=false
      }
    },

  },

  computed:{
    dialog(){
      return this.$store.getters['get_notProvidableModal']
    },
    crossDockId(){
      return this.$store.getters['get_notProvidableModalId']
    },
    warehouseData(){
      try {
        return this.warehouseList.data
      }
      catch (e) {
        return []
      }
    }
  },

}
</script>

<style>



</style>