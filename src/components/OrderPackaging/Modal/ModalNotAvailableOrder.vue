<template>
  <div class="text-center">
    <v-dialog
        v-model="dialog"
        width="468">

      <v-card class="rounded-lg">
        <v-row justify="center" align="center" class="pa-3">
          <v-col cols="3">
            <v-btn @click="close()" variant="icon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="9">
            <div class="text-left pl-16">
              <span class="t14500">هشدار</span>
            </div>
          </v-col>
        </v-row>
        <div class="mt-3 px-5">
          <v-divider/>
        </div>

        <div class="text-center px-6 my-5">
          <div class="t14500 text-gray600">. سفارش داری کسری می باشد  </div>
          <div class="t14500 text-gray600 mt-2"> .با تیم پشتیبانی تماس گرفته و کالای دارای کسری را حذف نمایید</div>
        </div>
        <div class="px-5">
          <v-divider/>
        </div>

        <div class="text-center mt-3 pb-5">
          <v-btn
              :loading="loading"
              color="primary500"
              @click="close()"
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
  name: "ModalNotAvailableOrder",

  data(){
    return {
      dialog: false,
      loading: false
    }
  },

  methods: {
    close() {
      this.dialog = false
    }
  }
}
</script>

<style scoped>

</style>