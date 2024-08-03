<template>
    <template v-if="itemBase">
        <PickUpItemBase/>
    </template>
    <template v-if="orderBase">
        <PickUpOrderBase/>
    </template>

    <template v-if="pickUpIsNull">
        <div class="h-100 bg-warning d-flex justify-center align-center" >
            <div class=" text-center mx-15">
                <v-icon size="40">
                    mdi-alert-circle
                </v-icon>
                <div class="mt-15 t20700">
                    کالایی برای جمع آوری یافت نشد.
                </div>
            </div>

            <div class="px-15 d-flex justify-center t16500" style="  position: absolute; bottom: 30px; left: 0;right: 0;">
                <v-btn
                    height="40"
                    flat
                    block
                    rounded
                    @click="$router.push('/locating/dashboard')"
                    class="px-8 mt-5 me-3">
                    بازگشت به داشبورد
                </v-btn>
            </div>
        </div>
    </template>

</template>

<script>
import PickUpItemBase from "@/components/WarehouseOrderList/PickUpItemBase.vue";
import PickUpOrderBase from "@/components/WarehouseOrderList/PickUpOrderBase.vue";
import {AxiosCall} from "@/assets/js/axios_call";

export default {
  components: {
    PickUpItemBase,
    PickUpOrderBase
  },
  data(){
    return{
        itemBase: false,
        orderBase: false,
        pickUpIsNull: false
    }
  },
    methods: {
        async getTasks(){
            const AxiosMethod = new AxiosCall()
            AxiosMethod.using_auth = true
            AxiosMethod.token = this.$cookies.get('adminToken')
            AxiosMethod.end_point = `warehouse/order/pickup/my-tasks`
            let data = await AxiosMethod.axios_get()

            if (data.warehouse_mode === 'item_base') {
                this.itemBase = true
            }
            else if (data.warehouse_mode === 'order_base') {
                this.orderBase = true
            }
            else if (data.data.length === 0){
                this.pickUpIsNull = true
            }
        },
    },

  mounted() {
      this.getTasks()
  },
}
</script>
