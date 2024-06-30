<template>
  <v-dialog
      v-model="dialog"
      width="468">
    <v-card class="rounded-lg">
      <v-row
          justify="center"
          align="center"
          class="pa-3">
        <v-col cols="3">
          <v-btn @click="close()" variant="icon">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="9">
          <div class="text-left pl-12">
            <span class="t14500">خالی کردن شلف سورتینگ</span>
          </div>
        </v-col>
      </v-row>
      <div class="mt-3 mb-8 px-5">
        <v-divider/>
      </div>

      <div class="text-center px-6">
        <div class="t14500 text-gray600"> .با خالی کردن شلف سورتینگ دیگر به جزئیات آن دسترسی نخواهید داشت  </div>
        <div class="t14500 text-gray600 mt-2">آیا از انجام این کار اطمینان دارید؟</div>
      </div>


      <div class="mt-3 mb-8  px-5">
        <v-divider/>
      </div>

      <div class="text-center pb-5">
        <v-btn
            :loading="loading"
            color="primary500"
            @click="confirmation"
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
</template>
<script>

export default {
  name: "ModalSortingShelf",

  data(){
    return {
      loading: false,
      dialog: false,
    }
  },

  methods:{
    async confirmation() {
      console.log('confirmation')
    },

    close() {
      this.dialog = false
    },

  }
}
</script>

<style scoped>

</style>