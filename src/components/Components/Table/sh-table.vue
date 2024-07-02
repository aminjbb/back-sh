<template>
  <div class="c-table rounded-t-lg">
    <v-data-table
        class="table mt-5"
        :headers="headers"
        :items="items"
        :show-select="isSelect"
        hide-default-footer
        item-value="index">
      <template v-slot:item.row="{ item, index }">
        <span> {{rowIndexTable(index)}} </span>
      </template>
      <template v-slot:item.id="{ item }">
        <span> {{ item.id }}</span>
      </template>
      <template v-slot:item.name="{ item }">
        <div class="">
          <span>
            <img src="@/assets/img/shps_img.png" :alt="item.name">
          </span>
          <span> {{item.name}} </span>
        </div>
      </template>
      <template v-slot:item.price="{ item }">
        <span>
          {{ splitChar(item.price) }}ریال
        </span>
      </template>
      <template v-slot:item.discount="{ item }">
        <span>
          {{ splitChar(item.discount) }}ریال
        </span>
      </template>
      <template v-slot:item.priceDiscount="{ item }">
        <span>
          {{ splitChar(item.priceDiscount) }}ریال
        </span>
      </template>
      <template v-slot:item.previous_inventory="{ item }">
        <span>
          {{ item.previous_inventory}}
        </span>
      </template>
      <template v-slot:item.amount="{ item }">
        <span class="text-center" :class="item.amount < 0 ? 'text-error' : 'text-success'">
          {{ item.amount}}
        </span>
      </template>
      <template v-slot:item.inventory="{ item }">
        <span>
          {{ item.inventory}}
        </span>
      </template>
      <template v-slot:item.reason="{ item }">
        <span>
          {{ item.reason}}
        </span>
      </template>
      <template v-slot:item.created_at="{ item }">
        <span>
          {{ item.created_at}}
        </span>
      </template>
      <template v-slot:item.previous_price="{ item }">
        <span>
          {{ splitChar(item.previous_price)}}ریال
        </span>
      </template>
      <template v-slot:item.amount_change_price="{ item }">
        <span :class="item.amount_change_price < 0 ? 'text-error' : 'text-success'">
          {{ splitChar(item.amount_change_price)}}ریال
        </span>
      </template>
      <template v-slot:item.current_price="{ item }">
        <span>
          {{ splitChar(item.current_price)}}ریال
        </span>
      </template>
      <template v-slot:item.amount_discount="{ item }">
        <span :class="item.amount_discount < 0 ? 'text-error' : 'text-success'">
          {{ splitChar(item.amount_discount)}}ریال
        </span>
      </template>
      <template v-slot:item.shps_count="{ item }">
        <span>
          {{ item.shps_count}}
        </span>
      </template>
      <template v-slot:item.shps_variety="{ item }">
        <span>
          {{ item.shps_variety}}
        </span>
      </template>
      <template v-slot:item.status="{ item }">
         <span
             class="rounded-xl px-4 py-1"
             :class="setBgStatus(item.status)"
             v-if="item.status">
              {{dictionary(item.status)}}
            </span>
      </template>
      <template v-slot:item.action_shipment="{ item }">
        <v-menu :close-on-content-click="false" :location="location">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props">
              mdi-dots-vertical
            </v-icon>
          </template>
          <v-list>
            <v-list-item height="380">
              <v-list-item-title>
                <div class="ma-5 cursor-pointer">
                  <v-icon class="text-grey-darken-1">mdi-pencil-box-outline</v-icon>
                  <span class="mr-2 text-grey-darken-1 ">مدیریت کالاها</span>
                </div>
              </v-list-item-title>
              <v-list-item-title>
                <div class="ma-5 pointer" @click="openModal('sendingRequest')">
                  <v-icon class="text-grey-darken-1">mdi-truck-outline</v-icon>
                  <span class="mr-2 text-grey-darken-1 ">درخواست ارسال</span>
                  <ReusableModal width="800" v-model="modalSendingRequest"  title="درخواست ارسال" type="sendingRequest" />
                </div>
              </v-list-item-title>
              <v-list-item-title>
                <div class="ma-5 cursor-pointer" @click="openModal('barcodePrint')">
                  <v-icon class="text-grey-darken-1">mdi-printer-outline</v-icon>
                  <span class="mr-2 text-grey-darken-1 ">پرینت برچسب</span>
                  <ReusableModal width="800" v-model="barcodePrint"  title="پرینت برچسب" type="barcodePrint" />
                </div>
              </v-list-item-title>
              <v-list-item-title>
                <div class="ma-5 cursor-pointer" @click="openModal('consignmentPrint')">
                  <v-icon class="text-grey-darken-1">mdi-printer-outline</v-icon>
                  <span class="mr-2 text-grey-darken-1 ">پرینت محموله</span>
                  <ReusableModal width="800" v-model="modalConsignmentPrint"  title="پرینت محموله" type="consignmentPrint" />
                </div>
              </v-list-item-title>
              <v-list-item-title>
                <div class="ma-5 cursor-pointer">
                  <v-icon class="text-grey-darken-1">mdi-cancel</v-icon>
                  <span class="mr-2 text-grey-darken-1 ">لغو درخواست</span>
                </div>
              </v-list-item-title>
              <v-list-item-title>
                <div class="ma-5 cursor-pointer">
                  <v-icon class="text-grey-darken-1">mdi-trash-can-outline</v-icon>
                  <span class="mr-2 text-grey-darken-1 ">حذف</span>
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:item.shps_counts="{ item }">
        <span>
         <v-text-field v-model="item.shps_counts"  variant="outlined"  class="mt-2"/>
        </span>
      </template>
      <template v-slot:item.transaction_type="{ item }">
         <span
             class="rounded-xl px-4 py-1"
             :class="setBgStatus(item.transaction_type)"
             v-if="item.transaction_type">
              {{dictionary(item.transaction_type)}}
            </span>
      </template>
      <template v-slot:item.transaction_amount="{ item }">
        <span class="text-center" :class="item.transaction_amount < 0 ? 'text-error' : 'text-success'">
          {{ splitChar(item.transaction_amount)}} ریال
        </span>
      </template>
      <template v-slot:item.action_ticket="{ item }">
        <v-menu :close-on-content-click="false" :location="location">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props">
              mdi-dots-vertical
            </v-icon>
          </template>
          <v-list>
            <v-list-item height="50">
              <v-list-item-title>
                <div class="cursor-pointer" @click="$router.push(`/ticket/${item.id}/edit`)">
                  <v-icon class="text-grey-darken-1">mdi-eye-outline</v-icon>
                  <span class="mr-2 text-grey-darken-1 t14300">نمایش درخواست</span>
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <!-- Empty List -->
      <template v-slot:no-data>
        <div class="d-flex justify-center align-center flex-column py-14">
          <img src="@/assets/img/empty.svg" alt="empty">
          <div class="d-flex justify-center align-center flex-column">
            <span class="text-gray500 text-center text-body-1">اطلاعاتی برای نمایش وجود ندارد.</span>
          </div>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {dictionary, setBgStatus, splitChar} from "@/assets/js/functions.js"
import {defineAsyncComponent} from "vue";
const ReusableModal = defineAsyncComponent(()=> import ('@/components/kits/Modals/s-modal-reusable.vue'))

export default {
  name: "Table",

  props: {
    headers: Array,
    items: Array,
    isSelect: Boolean,
    page: Number,
    perPage:Number
  },

  components: {
    ReusableModal
  },

  data() {
    return {
      modalSendingRequest : false,
      barcodePrint: false,
      modalConsignmentPrint: false,
    }
  },

  methods: {
    setBgStatus,
    dictionary,
    splitChar ,

    openModal(type) {
      if (type === "sendingRequest"){
        this.modalSendingRequest = true
      }
      else if (type === "barcodePrint"){
        this.barcodePrint = true
      }
      else if (type === "consignmentPrint"){
        this.modalConsignmentPrint = true
      }
      this.modalType = type;
    },

    rowIndexTable(index) {
      let rowIndex = 0
      if (this.page === 1) {
        rowIndex = (1 + index)
        return rowIndex
      } else {
        rowIndex = ((this.page - 1) * this.perPage) + index + 1
        return rowIndex
      }
    },
  }
}
</script>

<style scoped>
.c-table {
  overflow-x: auto;
  height: calc(100% - 70px);
  -webkit-overflow-scrolling: touch;

&::-webkit-scrollbar {
   height: 5px;
   width: 12px;
 }

&::-webkit-scrollbar-track {
   border-radius: 3px;
   background-color: #e2e2ea;
 }

&::-webkit-scrollbar-thumb {
   border-radius: 3px;
   background-color: #91919b;
 }
}
.v-data-table >>> thead tr {
  background-color: #dcdef6 !important;
}

</style>