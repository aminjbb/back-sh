<template>
<div class="h-100 d-flex flex-column align-stretch order-tracking">
    <v-card height="70" class="ma-5 br--12 stretch-card-header-70">
        <v-row justify="space-between" align="center" class="px-7 py-5 order-tracking__search">
            <template v-if="orderDetails && orderDetails?.user">
                <div class="d-flex align-center mt-1">
                    <div class="t12 w500 text-right ml-2 mt-1">
                        :نام و نام خانوادگی
                    </div>
                    <div class="t14 w500 text-right ml-2 mt-1">
                        {{ orderDetails?.user?.first_name }} {{ orderDetails?.user?.last_name }}
                    </div>

                    <v-btn variant="outlined" color="primary500" height="40" rounded class="px-8 mt-1" @click="showUserDetails()">
                        مشاهده اطلاعات کاربر
                    </v-btn>
                </div>

                <div class="t14 w500" @click="backStep1()" style="cursor: pointer;">
                    جستجو مجدد
                </div>
               
            </template>

            <template v-else>
                <div class="t12 w500 text-right ml-2 mt-1">
                    جستجو بر اساس:
                </div>
                <div class="d-flex align-center justify-center flex-grow-1 mt-1">
                    <v-row class="align-center">
                        <v-col cols="2" class="d-flex align-cneter">
                            <v-text-field variant="outlined" placeholder="نام" name="name" v-model="user.first_name" class="t12 w500" />
                        </v-col>

                        <v-col cols="2" class="d-flex align-cneter">
                            <v-text-field variant="outlined" placeholder="نام خانوادگی" name="name" v-model="user.last_name" />
                        </v-col>

                        <v-col cols="2" class="d-flex align-cneter">
                            <v-text-field variant="outlined" placeholder="شماره موبایل" name="name" v-model="user.phone_number" />
                        </v-col>

                        <v-col cols="2" class="d-flex align-cneter">
                            <v-text-field variant="outlined" placeholder="شماره سفارش" name="name" v-model="user.order_number" />
                        </v-col>

                        <v-col cols="2" class="d-flex align-cneter">
                            <v-text-field variant="outlined" placeholder="شناسه سفارش" name="name" v-model="user.order_id" />
                        </v-col>

                        <v-col cols="2">
                            <v-btn variant="outlined" color="primary500" height="40" rounded class="px-8 mt-1 w-100" @click="tracking">
                                جستجو
                            </v-btn>
                        </v-col>
                    </v-row>
                </div>
            </template>
        </v-row>
    </v-card>

    <v-card class="ma-5 br--12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <ShTable
          class="flex-grow-1"
          :headers="header"
          :items="itemListTable"
          :loading="loading">
        <template v-slot:showSlot="item">
          <v-icon color="primary500" @click="showOrderDetails(item.data.id)">mdi-eye</v-icon>
          <orderModal :data="item.data.data" :ref="`orderTrackingDetails${item.data.id}`" />
        </template>
      </ShTable>
    </v-card>
</div>
<userDetailsModal :data="orderDetails?.user" ref="userTracking" />
</template>

<script>
//components
import userDetailsModal from '@/components/OrderTracking/Modals/UserDetails.vue'

//composable
import OrderTracking from '@/composables/OrderTracking';
import ShTable from "@/components/Components/Table/sh-table.vue";
import orderModal from '@/components/OrderTracking/Modals/OrderDetails.vue'

export default {
  components: {
    userDetailsModal,
    ShTable,
    orderModal
  },

  data() {
    return {
      user: {
        first_name: null,
        last_name: null,
        phone_number: null,
        order_number: null,
        order_id: null,
      },
      searched: false,
      itemListTable:[]
    }
  },

  setup() {
    const {
      getUserOrders,
      orderDetails,
      header,loading
    } = OrderTracking();
    return {
      getUserOrders,
      orderDetails,
      header,
      loading
    };
  },

  methods: {
    showOrderDetails(id){
      this.$refs[`orderTrackingDetails${id}`].dialog = true;
    },

    tracking() {
      this.getUserOrders(this.user);
    },

    showUserDetails(){
      this.$refs.userTracking.dialog = true;
    },

    backStep1(){
      this.searched = false;
      this.orderDetails = null
    },
  },

  watch:{
    orderDetails(newVal, oldVal){
      if(newVal !== null && newVal !== oldVal){
        this.searched = true;
        this.itemListTable = []

        this.orderDetails.orders.forEach((item) =>
            this.itemListTable.push(
                {
                  data: item,
                  id: item.id,
                  order_id: item.id,
                  order_number: item.order_number,
                  order_status: item.status? item.status : '-',
                },
            ),
        )
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/custom/views/order-tracking.scss';
</style>
