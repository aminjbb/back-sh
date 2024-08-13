<template>
  <v-layout class="bg-gray">
    <v-main class="h-100 ">
      <div class="h-100vh " >
        <!--        <WarehouseOrderPickUp />-->
        <template v-if="itemBase">
          <PickUpItemBase/>
        </template>
        <template v-if="orderBase">
          <PickUpOrderBase @recallMyTasks="myTasks()" @openShelf="openShelf()" :pages="pages" :pickUpTasks="pickUpTasks" :pickUpCount="pickUpCount"/>
        </template>
        <template v-if="pages.pickUpIsNull">
          <div class="h-100 bg-warning d-flex justify-center align-center" >
            <div class=" text-center mx-15">
              <v-icon size="40">
                mdi-alert-circle
              </v-icon>
              <div class="mt-15 t20 w700">
                کالایی برای جمع آوری یافت نشد.
              </div>
            </div>

            <div class="px-15 d-flex justify-center t16 w500" style="  position: absolute; bottom: 30px; left: 0;right: 0;">
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
      </div>
    </v-main>
  </v-layout>
</template>

<script>
// import {defineAsyncComponent} from "vue";
// const WarehouseOrderPickUp = defineAsyncComponent(()=> import ('@/components/WarehouseOrderList/WarehouseOrderPickUp.vue'))
import PickUpItemBase from "@/components/WarehouseOrderList/PickUpItemBase.vue";
import PickUpOrderBase from "@/components/WarehouseOrderList/PickUpOrderBase.vue";
import axios from "axios";

export default {
  components: {
    PickUpItemBase,
    PickUpOrderBase
  },
  data(){
    return{
      itemBase: false,
      orderBase: false,

      pages: {
        pickUp: false,
        shelf: false,
        completedPickUp: false,
        rejectedPickUp: false,
        partialCompletedPickUp: false,
        pickUpIsNull: false,
        pendingPickUp: false,
      },

      pickUpTasks: null,
      pickUpCount: null,
    }
  },
  methods: {
    async myTasks(){
      this.pages.pickUp = false
      await axios
          .get(`${import.meta.env.VITE_API_BASEURL}/v1/warehouse/order/pickup/my-tasks`, {
            headers: {
              Authorization:
                  "Bearer " + this.$cookies.get('adminToken')
            },
          })
          .then((res) => {
            console.log(res.data.data)

            if (res.data.data.length === 0){
              this.pages.pickUpIsNull = true
            } else if (res.data.data.warehouse_mode === 'item_base') {
              this.itemBase = true
            }
            else if (res.data.data.warehouse_mode === 'order_base' && res.data.data.order_pickup_status === 'pickup_completed') {
              this.pickUpTasks = res.data.data
              this.orderBase = true
              this.pages.pickUp = true
              this.pages.completedPickUp = true
            } else if (res.data.data.warehouse_mode === 'order_base'){
              this.pickUpTasks = res.data.data
              this.orderBase = true
              this.pages.pickUp = true
              this.pickUpCount = parseInt(res.data.data.count) - parseInt(res.data.data.picked_count)
            }
          }).catch((err) => {
            console.log(err)
            if (err.response.status === 401) {
              this.$router.push('/login')
            }  if (err.response.status === 421) {
              this.pages.rejectedPickUp = true
            } else if (err.response.status === 420) {
              this.pages.partialCompletedPickUp = true
            } else if (err.response.status === 422) {
              this.pages.pendingPickUp = true
            }
          })
    },

    openShelf(){
      this.pages.pickUp = false
      this.pages.shelf = true
    }
  },
  mounted() {
    this.myTasks()
  },
}
</script>

