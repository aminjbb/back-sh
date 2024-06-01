<template>
  <div class="h-100 d-flex flex-column align-stretch seller">
    <v-card height="70" class="ma-5 br-12 stretch-card-header-70">
      <v-row
          justify="center"
          align="center"
          class="px-10 pt-3">
        <v-col cols="12">
          <v-btn
              variant="outlined"
              rounded
              class="px-3 mt-1">
            لغو کل سفارش
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="ma-5 mt-0 br-12 flex-grow-1 d-flex flex-column align-stretch" height="580">
      <CanselOrderTable
          class="flex-grow-1"
          :header="headerCanselOrder"
          :items="canselOrderList"/>
      <v-divider/>

      <v-card-actions class="pb-3">
        <v-row justify="space-between" class="pr-10">
          <v-col cols="2">
            <span class="text-center">جمع:</span>
          </v-col>
          <v-col cols="1" class="text-center number-font">تعداد کالا</v-col>
          <v-col cols="1" class="text-center number-font">کالای کنسلی</v-col>
          <v-col cols="1" class="text-center number-font">باقیمانده</v-col>
          <v-col cols="1" class="text-center number-font">قیمت کالا</v-col>
          <v-col cols="1" class="text-center number-font">مقدار تخفیف پایه</v-col>
          <v-col cols="1" class="text-center number-font">مقدار تخفیف مارکتینگ</v-col>
          <v-col cols="1" class="text-center number-font">کد تخفیف</v-col>
          <v-col cols="3" class="text-center number-font">پرداخت نهایی</v-col>
        </v-row>
      </v-card-actions>

      <v-divider/>

      <v-card-actions>
        <v-row justify="space-between">
          <v-col cols="9"/>
          <v-col cols="3">
            <v-btn
                height="40"
                rounded
                class="px-8 mt-1 mr-5">
              انصراف
            </v-btn>
            <v-btn
                color="primary500"
                height="40"
                rounded
                variant="elevated"
                class="px-8 mt-1">
              ذخیره
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Orders from "@/composables/Orders";
import CanselOrderTable from "@/components/Orders/Table/CancelOrderTable.vue";
import SaveModal from "@/components/Orders/Modal/SaveModal.vue";

export default {
  components: {SaveModal, CanselOrderTable},
  setup() {
    const {
      headerCanselOrder,
      canselOrderList
    } = Orders();
    return {
      headerCanselOrder,
      canselOrderList
    }
  },

  data() {
    return {
      dialog: false
    }
  }
}
</script>


<style scoped>

</style>