<template>
  <div class="text-center mb-5">
    <v-card
        @click="dialog=true"
        height="50"
        class="mx-2"
        variant="outlined"
        :color="cardColor(order.status)">
      <div class="d-flex align-center justify-center py-3 px-5">
        <span>شناسه:</span>
        <span class="number-font mr-1">{{ order.id }}</span>
      </div>
    </v-card>

    <v-dialog
        v-model="dialog"
        width="468">
      <v-card class="rounded-lg">
        <v-row
            justify="center"
            align="center"
            class="pa-3">
          <v-col cols="3">
            <v-btn
                @click="close()"
                variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="9">
            <div class="text-left pl-16">
              <span class="t14500">انتخاب عملیات</span>
            </div>
          </v-col>
        </v-row>
        <div class="mt-3 mb-8 px-5">
          <v-divider/>
        </div>

        <div class="text-right px-6">
          <span class="t14500 text-gray600">.عملیات مورد نظر را انتخاب کنید</span>
        </div>

        <div class="d-flex text-right mt-5 mx-3">
          <v-radio-group
              v-model="selectedOperation"
              inline>
            <v-radio label="خالی کردن شلف سورتینگ" value="shelf" />
            <v-radio class="mr-16" label="اتمام سفارش" value="order-packaging" />
          </v-radio-group>
        </div>


        <div class="mt-3 mb-8  px-5">
          <v-divider/>
        </div>

        <div class="text-center pb-5">
          <v-btn
              :loading="loading"
              color="primary500"
              @click="confirmation()"
              height="40"
              rounded
              class="px-5 mt-1 mr-15">
            تایید
          </v-btn>
          <v-btn
              @click="close()"
              variant="text"
              height="40"
              rounded
              class="px-5 mt-1 ml-15">
            انصراف
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    order: null,
    getWarehouseOrders: {
      type: Function
    }

  },
  data() {
    return {
      loading: false,
      dialog: false,
      selectedOperation:null
    }
  },

  methods: {
    cardColor(status) {
      if (status === 'completed') return 'success'
      else if (status === 'processing') return 'warning'
      else return ''
    },

    close() {
      this.dialog = false
    },

    confirmation(){
      this.dialog = false
      if (this.selectedOperation === 'shelf')  this.$emit('selectedShelf')
        else if (this.selectedOperation === 'order-packaging') this.$emit('selectedCompletedOrder')
    }
  }
}
</script>
